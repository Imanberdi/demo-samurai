import { Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Paginator = ({ onPageChange }) => {
  let totalUsersCount = useSelector((state) => state.usersPage.totalUsersCount);
  let pageSize = useSelector((state) => state.usersPage.pageSize);

  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let portionSize = 10;
  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <>
      <PageNumberContainer>
        {portionNumber > 1 && (
          <Button
            onClick={() => {
              setPortionNumber(portionNumber - 1);
            }}
            style={{ color: "silver" }}
          >
            Prev
          </Button>
        )}
        {pages
          .filter(
            (page) =>
              page >= leftPortionPageNumber && page <= rightPortionPageNumber
          )
          .map((page) => (
            <PageNumber
              onClick={() => {
                onPageChange(page);
              }}
              key={page}
            >
              {page}
            </PageNumber>
          ))}
        {portionCount > portionNumber && (
          <Button
            onClick={() => {
              setPortionNumber(portionNumber + 1);
            }}
            style={{ color: "silver" }}
          >
            Next
          </Button>
        )}
      </PageNumberContainer>
    </>
  );
};

export default Paginator;

const PageNumberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
  font-size: 20px;
`;
const PageNumber = styled.span`
  margin-left: 10px;
  cursor: pointer;
`;
