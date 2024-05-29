import ClipLoader from "react-spinners/ClipLoader";



const Loading = ({loading}) => {

    const cssOverride = {
        display : 'Block', 
        margin : '100px auto'
    }

    return (
        <ClipLoader color="#388E3C"
                loading={loading}
                cssOverride={cssOverride}
                size={150} 
                aria-label="Loading Spinner"
                data-testid="loader"/>
    )
};

export default Loading; 