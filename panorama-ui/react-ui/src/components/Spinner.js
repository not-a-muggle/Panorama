import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
class Webpage extends React.Component {
  state = {
    content: null,
  };
  componentDidMount() {
    getContentFromAPI.then((content) =>
       this.setState({
          content: content
       })
    );
  };
render() {
    if (!this.state.content) 
       return (
          <div className="Loader">
             <Dimmer active inverted size="massive">
                <Loader inverted>Loading</Loader>
             </Dimmer>
          </div>
        );
   };
}
export default Webpage;