import React, {useState} from 'react'


export function Test(props) {

    const [value , setValue ] = useState({firstval  : 5 , secondval : 10})

    return (
            <React.Fragment  >
            <h1> Name : {props.name} first value =  {value.firstval} second value = {value.secondval}  </h1> 
            <button onClick = {  () => {setValue({ ...value,  firstval : 15 , secondval : 50   })} } >  value  </button>
                </ React.Fragment >
    )
}






// import React,{Component} from 'react'

// export class Test extends Component {
    
//     state = {
//         age : 20 ,
//         name : "Ram"
//     }

//     render(){
     
//     return (
//         <div>
//             <h1>Only for the testing purpose  {this.props.name} {this.state.age} {this.state.name} </h1>
//             <button onClick = { () => { this.setState({ age : 25 , name : "Rahul"  })   }    }  > Change Age  </button>
//         </div>
//     )
//     }
// }


