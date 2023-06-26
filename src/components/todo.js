import React, { useState, useEffect } from "react";
import "./style.css";

// get local storage Data

const getLocalData = () => {
  const lists = localStorage.getItem("myTodo")

  if(lists){
    return JSON.parse(lists);
  }
  else{
    return []
  }
}

const Todo = () => {

    const [inputData,setInputData] = useState("");
    const [items,setItems] = useState(getLocalData());
    const [isEditItems,setIsEditItems] = useState("");
    const [togglebtn,settogglebtn] = useState(false);

    // add Items in the list (to do list) with help of '+'
    const addItem =() => {
      if(!inputData){
        alert('Please Fill the Data')
      }
      else if(inputData && togglebtn){
        setItems(items.map((currElem)=>{
          if(currElem.id === isEditItems){
            return {...currElem,name:inputData}
          }
          return currElem
        })

      )

      setInputData("");
      settogglebtn(false);
      setIsEditItems(null);
    }
      else{
        const myInputData = {              //myInputData : object to store index of each item in the list so that we can retrieve each item in the list with the help of unique index .
          id: new Date().getTime().toString(),
          name: inputData,
        }
        setItems([...items,myInputData])  //spread operator(...) = it will help us store previous data as well in the array . So the array will consist of not only the new data but also previous data that was entered in the list. 
        setInputData("")
      }
    }

    // Edit Items

    const editItem = (index) => {
      const item_edited = items.find ((currElem) => {
        return currElem.id === index;
      })
      setInputData(item_edited.name);
      setIsEditItems(index);
      settogglebtn(true);
    }

    //delete items in the list

    const deleteItem = (index)=>{
      const updatedItems = items.filter((currElem) => {
        return currElem.id !== index;
      })
      setItems(updatedItems);
    }

    //delete all items in the list using check list button 

    const removeAll = () => {
      setItems([]);
    }

    // adding local storage

    useEffect(() => {
      localStorage.setItem("myTodo", JSON.stringify(items))
    }, [items])
    
  
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value = {inputData}
              onChange={(event)=> setInputData(event.target.value)}
            />
            {togglebtn ? (<i className="far fa-edit add-btn" onClick = {addItem}></i>) : <i className="fa fa-plus add-btn" onClick = {addItem}></i>}  
          </div>
          <div className="showItems">
            {items.map((currElem,index)=>{
              return (
                <div className="eachItem" key={currElem.id} >   
                  <h3>{currElem.name}</h3>    {/* .name because currelem consist of key value pair of index and name that is store in the object (myInputData)*/}
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick = {() => editItem(currElem.id)}></i>
                    <i className="far fa-trash-alt add-btn" onClick = {() => deleteItem(currElem.id)}></i>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick = {removeAll}><span>CHECK LIST</span></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
