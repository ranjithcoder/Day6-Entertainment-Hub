import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

const CustomPagination = ({setpage,numOfPages=10}) => {
    const handlePageChange = (page) => {
        setpage(page);
        window.scroll(0,0);
       
    }

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numOfPages}
          onClick={(e) => handlePageChange(e.target.textContent)}
          color='primary'
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider>
    </div>
  )
}

export default CustomPagination
