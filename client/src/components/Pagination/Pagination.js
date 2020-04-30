import React from 'react';
import { Pagination as PaginationAntd } from 'antd';

import './Pagination.scss';

export default function Pagination(props) {
    const { blogs, location, history } = props;
    const currentPage = parseInt(blogs.page);

    const onChangePage = newPage => {    
        history.push(`${location.pathname}?page=${newPage}`);
    };    

    return (
        <PaginationAntd 
            className="pagination"
            defaultCurrent={currentPage}
            pageSize={blogs.limit}
            total={blogs.total}
            onChange={newPage => onChangePage(newPage)}
        />
    );
}