import _ from "lodash";

// connecting React into project, component added after
import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";

// importing search bar component
import SearchBar from "./components/search_bar";
// importing video list
import VideoList from "./components/video_list"
import VideoDetail from "./components/video_detail"

//  YouTube Api Key
const API_KEY = "AIzaSyCjIWBKrBbGI37LN1OB78zQ1VtRQJtED6w";



class App extends Component {

    constructor(props) {
        super(props);
        // an array to store videos
        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch("surfboards");
    }

    videoSearch(term) {
        // Made a youtube search by API   |   same with   function (data)
        YTSearch({ key: API_KEY, term: term }, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
            // this.setState({videos: videos});  <---- upper means this
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

        return (                    // below 'passing props'
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                    videos={this.state.videos} />
            </div >
        );
    }
}

/* OLD COMPONENT
// Create a new component. This component should produce some HTML
const App = () => {
    //     It is JSX, which is html for js's
    return (
        <div>
            <SearchBar />
        </div>
    );
}
*/

// Take this components generated HTML and put in on the page (in the DOM)
//                        placed the element into container class pbject
ReactDOM.render(<App />, document.querySelector(".container"));