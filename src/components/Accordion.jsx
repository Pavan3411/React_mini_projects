import React, { useState } from 'react'
import data from '../assets/data.js'

//single selection
//multi selection

const Accordion = () => {
  const [selected, setSelected] = useState(null)
  const [enableMultiSelection, setEnableMultiSelection] = useState(false)
  const [multipleId, setMultipleId] = useState([])
  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId)
    console.log(selected)
  }
  function handleMultiSelection(getCurrentId) {
    let cpyMultiple = [...multipleId]
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId)

    console.log(findIndexOfCurrentId)
    if (findIndexOfCurrentId === -1) cpyMultiple.push(getCurrentId)
    else cpyMultiple.splice(findIndexOfCurrentId, 1)

    setMultipleId(cpyMultiple)
  }
  console.log(selected, multipleId)

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {
                enableMultiSelection ? 
                multipleId.indexOf(dataItem.id) !== -1 &&
                <div className="content">{dataItem.answer}</div> :
                selected === dataItem.id && <div className="content">{dataItem.answer}</div>
              }
            </div>
          ))
        ) : (
          <div>No data Found!</div>
        )}
      </div>
    </div>
  )
}

export default Accordion
