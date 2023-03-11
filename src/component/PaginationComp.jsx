import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
import { returnPaginationPage } from "../utils/appUtils"

function PaginationComp(props) {

  let array = returnPaginationPage(props.totalPage, props.page, props.limit, props.sibling)
  // 
  // 
  return (
    <>

      <Pagination>
        <Pagination.First onClick={() => { props.onPageChange("&laquo;") }} />
        <Pagination.Prev onClick={() => { props.onPageChange("&lsaquo;") }} />
        {/* <Pagination.Item>{1}</Pagination.Item> */}
        {/* <Pagination.Ellipsis /> */}

        {array.map(value => {
          if (value === props.page) {
            return <Pagination.Item key={value} active>{value}</Pagination.Item>
          } else {
            return <Pagination.Item key={value} onClick={() => { props.onPageChange(value) }} >{value}</Pagination.Item>
          }
        })}
        {/* <Pagination.Item>{10}</Pagination.Item> */}
        {/* <Pagination.Item>{11}</Pagination.Item> */}
        {/* <Pagination.Item active>{12}</Pagination.Item> */}
        {/* <Pagination.Item>{13}</Pagination.Item> */}
        {/* <Pagination.Item disabled>{14}</Pagination.Item> */}

        {/* <Pagination.Ellipsis /> */}
        {/* <Pagination.Item>{20}</Pagination.Item> */}
        <Pagination.Next onClick={() => { props.onPageChange("&rsaquo;") }} />
        <Pagination.Last onClick={() => { props.onPageChange("&raquo;") }} />
      </Pagination>
    </>
  )
}

export default PaginationComp