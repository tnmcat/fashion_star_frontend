import EditIcon from '@mui/icons-material/Edit';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

StoreCategoryList.propTypes = {
    storeCategoryList: PropTypes.array
};

function StoreCategoryList(props) {
    const { storeCategoryList } = props;

    if (!storeCategoryList || storeCategoryList.length === 0) {
        return (
            <>
                <Typography variant="body1" align="center">No category found</Typography>
            </>
        );
    }
    return (
        <>
            <TableContainer component={Paper} sx={{ mt: 0, mb: 2, ml: 'auto', mr: 'auto', width: 'auto' }}>
                <Table sx={{ minWidth: 300, tableLayout: 'auto' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Category name</TableCell>
                            <TableCell align="right">Main Category</TableCell>
                            <TableCell align="right">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {storeCategoryList.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { backgroundColor: '#f5f5f5' }
                                }}
                            >
                                <TableCell component="th" scope="row" sx={{ py: 2 }}>{row.name}</TableCell>
                                <TableCell align="right" sx={{ py: 2 }}>{row.categoryDTO.name}</TableCell>
                                <TableCell align="right" sx={{ py: 2 }}><EditIcon /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default StoreCategoryList;
