import { Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { feedbacksSearchBarStyles } from './styles';


const FeedbacksSearchBar = ({ setFeedbacks, allFeedbacks }) => {
    const styles = feedbacksSearchBarStyles();
    const [ search, setSearch ] = useState("");
    const [ filterBy, setFilterBy ] = useState("");
    
    const handleChangeSearch = e => {
        const value = e.target.value;
        setSearch(value);
        if (value.length === 0) {
            setFeedbacks(allFeedbacks);
        } else if (!isNaN(value) && filterBy === 'rating') {
            setFeedbacks(allFeedbacks.filter(({ lectureRating }) => lectureRating.toString() === value));
            return;
        } else if (filterBy === 'user') {
            setFeedbacks(allFeedbacks.filter(({ user: { email } }) => email.toLowerCase().includes(value.toLowerCase())));
            return;
        } else if (filterBy) {
            setFeedbacks(allFeedbacks.filter(feedback => feedback[filterBy].toLowerCase().includes(value.toLowerCase())));
            return;
        } else {
            setFeedbacks(allFeedbacks.filter(({ lectureComment }) => lectureComment.toLowerCase().includes(value.toLowerCase())));
            return;
        };
    };

    const handleChangeFilter = e => {
        setFilterBy(e.target.value);
    };

    const filterByOptions = ['rating', 'comment', 'user', 'createdAt'];

    return (
        <Container className={styles.searchContainer} >
            <TextField
                name='search'
                value={search}
                color="secondary"
                onChange={handleChangeSearch}
                placeholder='Buscar feedback'
                variant='outlined'
            />
            <FormControl variant="filled" color="secondary" className={styles.filter} >
                    <InputLabel>Filtrar Feedback</InputLabel>
                    <Select
                        labelId="filter-by"
                        id="filter-by"
                        value={filterBy}
                        onChange={handleChangeFilter}
                    >
                        { filterByOptions.map(filter => <MenuItem key={filter} value={filter}>{`${filter[0].toUpperCase()}${filter.slice(1)}`}</MenuItem>)}
                    </Select>
                </FormControl>
        </Container>
    );
};

export default FeedbacksSearchBar;
