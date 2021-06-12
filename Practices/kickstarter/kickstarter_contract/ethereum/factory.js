import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x212Fbeb6d7933d2c03a50a12321c380f01b86976'
);

export default instance;