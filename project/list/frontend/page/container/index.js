import {useState} from 'react';

import {List} from '../../../component/build/component_index';

function Container() {
    const [columnData, setColumns] = useState(renderData);
    const [sort, setSort] = useState(renderSort);
    const [filter, setFilter] = useState(renderFilter);

    return <List
        columns={columnData.columns}
        sort={(sortType) => {
            fetch(`./data?sort=${sortType}&filter=${filter}`)
                .then(res => {
                    return res.json();
                })
                .then(json => {
                    setColumns(json);
                    setSort(sortType);
                })
                .catch(err => {
                    console.error(err);
                });
        }}
        filter={(filterType) => {
            fetch(`./data?sort=${sort}&filter=${filterType}`)
                .then(res => {
                    return res.json();
                })
                .then(json => {
                    setColumns(json);
                    setFilter(filterType);
                })
                .catch(err => {
                    console.error(err);
                });
        }}
    />
}

export default Container;