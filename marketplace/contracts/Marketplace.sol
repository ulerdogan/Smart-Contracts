// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is Ownable, ERC721Holder, ERC1155Holder {
    using EnumerableSet for EnumerableSet.UintSet;

    struct Listing {
        address owner;
        address tokenAddress;
        bool isFungible; // true for ERC1155, false for ERC721
        uint256 tokenId;
        uint256 price; // if 0, only open for auction
        address offerer;
        uint256 offer;
        uint256 offerTimestamp;
    }

    EnumerableSet.UintSet private listings;
    mapping(uint256 => Listing) private idToListing;
    uint256 listingNonce;

    mapping(address => EnumerableSet.UintSet) private userListings;

    address payable commisionAddress;
    uint256 commisionRate; // over 1000

    constructor(address payable _comissionAddress, uint256 _comissionRate) {
        commisionAddress = _comissionAddress;
        commisionRate = _comissionRate;
    }

    function listToken(
        address _tokenAddress,
        uint256 _tokenId,
        bool _isFungible,
        uint256 _price
    ) external returns (uint256) {
        require(_tokenAddress != address(0));
        if (_isFungible) {
            (
                IERC1155(_tokenAddress).balanceOf(msg.sender, _tokenId),
                "ERC1155 token not found"
            );
            (
                IERC1155(_tokenAddress).isApprovedForAll(
                    msg.sender,
                    address(this)
                ),
                "ERC1155 token is not approved for this contract"
            );
            IERC1155(_tokenAddress).safeTransferFrom(
                msg.sender,
                address(this),
                _tokenId,
                1,
                ""
            );
        } else {
            (
                IERC721(_tokenAddress).ownerOf(_tokenId) == msg.sender,
                "ERC721 token not found"
            );
            (
                IERC721(_tokenAddress).isApprovedForAll(
                    msg.sender,
                    address(this)
                ),
                "ERC721 token is not approved for this contract"
            );
            IERC721(_tokenAddress).safeTransferFrom(
                msg.sender,
                address(this),
                _tokenId,
                ""
            );
        }
        idToListing[listingNonce] = Listing(
            msg.sender,
            _tokenAddress,
            _isFungible,
            _tokenId,
            _price,
            address(0),
            0,
            0
        );
        listings.add(listingNonce);
        userListings[msg.sender].add(listingNonce);
        listingNonce++;
        return listingNonce - 1;
    }

    function delistToken(uint256 _listingId) external {
        Listing memory _listing = idToListing[_listingId];
        require(
            _listing.owner == msg.sender,
            "You are not the owner of this token."
        );
        if (idToListing[_listingId].isFungible) {
            IERC1155(_listing.tokenAddress).safeTransferFrom(
                address(this),
                msg.sender,
                _listing.tokenId,
                1,
                ""
            );
        } else {
            IERC721(_listing.tokenAddress).safeTransferFrom(
                address(this),
                msg.sender,
                _listing.tokenId,
                ""
            );
        }
        if (_listing.offer != 0) {
            payable(_listing.offerer).transfer(_listing.offer);
        }
        delete (idToListing[_listingId]);
        listings.remove(_listingId);
        userListings[_listing.owner].remove(_listingId);
    }

    function buy(uint256 _listingId) external payable {
        Listing memory _listing = idToListing[_listingId];
        require(
            _listing.owner != msg.sender,
            "You are the owner of this token."
        );
        require(_listing.price == msg.value, "Unappropriate payment.");
        if (idToListing[_listingId].isFungible) {
            IERC1155(_listing.tokenAddress).safeTransferFrom(
                address(this),
                msg.sender,
                _listing.tokenId,
                1,
                ""
            );
        } else {
            IERC721(_listing.tokenAddress).safeTransferFrom(
                address(this),
                msg.sender,
                _listing.tokenId,
                ""
            );
        }
        if (_listing.offer != 0) {
            payable(_listing.offerer).transfer(_listing.offer);
        }
        userListings[_listing.owner].remove(_listingId);
        uint256 ownerPayment = (msg.value * commisionRate) / 1000;
        payable(_listing.owner).transfer(ownerPayment);
        commisionAddress.transfer(msg.value - ownerPayment);
        delete (idToListing[_listingId]);
        listings.remove(_listingId);
    }

    function offer(uint256 _listingId) external payable {
        Listing storage _listing = idToListing[_listingId];
        require(
            _listing.owner != msg.sender,
            "You are the owner of this token."
        );
        require(
            msg.value > _listing.offer,
            "The offer must be bigger than the last offer."
        );
        require(
            _listing.price == 0 || msg.value < _listing.price,
            "The offer must be smaller than the price if it's not only on auction."
        );

        if (_listing.offer != 0) {
            payable(_listing.offerer).transfer(_listing.offer);
        }
        _listing.offer = msg.value;
        _listing.offerer = msg.sender;
        _listing.offerTimestamp = block.timestamp;
    }

    function deleteOffer(uint256 _listingId) external {
        Listing storage _listing = idToListing[_listingId];
        require(
            _listing.offerer == msg.sender,
            "You are not the owner of the offer."
        );
        require(
            block.timestamp > _listing.offerTimestamp + 8 hours,
            "You need to wait for 8 hours to delete your offer."
        );
        payable(_listing.offerer).transfer(_listing.offer);
        _listing.offer = 0;
        _listing.offerer = address(0);
        _listing.offerTimestamp = 0;
    }

    function approveOffer(uint256 _listingId, uint256 _offer) external {
        Listing memory _listing = idToListing[_listingId];
        require(
            _listing.owner == msg.sender,
            "You are not the owner of this token."
        );
        require(_listing.offer != 0, "There is not an offer.");
        require(_listing.offer == _offer, "The chosen offer has frontrunned.");
        if (idToListing[_listingId].isFungible) {
            IERC1155(_listing.tokenAddress).safeTransferFrom(
                address(this),
                _listing.offerer,
                _listing.tokenId,
                1,
                ""
            );
        } else {
            IERC721(_listing.tokenAddress).safeTransferFrom(
                address(this),
                _listing.offerer,
                _listing.tokenId,
                ""
            );
        }
        delete (idToListing[_listingId]);
        listings.remove(_listingId);
        userListings[_listing.owner].remove(_listingId);
    }

    function showListing(uint256 _listingId) external view returns(Listing memory) {
        return idToListing[_listingId];
    }
    
    function showMyListing(uint256 _order) external view returns(Listing memory) {
        return idToListing[userListings[msg.sender].at(_order)];
    }
}
