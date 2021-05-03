const Search = (props) => {
  return (
    <form className="form-group mt-4">
      <input
        className="form-control"
        type="search"
        placeholder="&#xF002;    Search"
        aria-label="Search"
        onInput={props.onInput}
        style={{ borderRadius: 20, "font-family": "Arial, FontAwesome" }}
      />
    </form>
  );
};

export default Search;

// import React, { Component } from "react";
// import axios from "axios";
// import Suggestions from "./suggestions";

// const API_URL =
//   "http://localhost:8080/providers/getallprovidersByCityAndResource/Delhi/Beds";

// class Search extends Component {
//   state = {
//     query: "",
//     results: [],
//   };

//   getInfo = () => {
//     axios.get(`${API_URL}?prefix=${this.state.query}&limit=7`).then((res) => {
//       this.setState({
//         results: res.data,
//       });
//     });
//   };

//   handleInputChange = () => {
//     this.setState(
//       {
//         query: this.search.value,
//       },
//       () => {
//         if (this.state.query && this.state.query.length > 1) {
//           if (this.state.query.length % 2 === 0) {
//             this.getInfo();
//           }
//         } else if (!this.state.query) {
//         }
//       }
//     );
//   };

//   render() {
//     return (
//       <form>
//         <input
//           placeholder="Search for..."
//           ref={(input) => (this.search = input)}
//           onChange={this.handleInputChange}
//         />
//         <Suggestions results={this.state.results} />
//       </form>
//     );
//   }
// }

// export default Search;
