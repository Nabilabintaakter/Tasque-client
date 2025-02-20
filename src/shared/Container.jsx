/* eslint-disable react/prop-types */


const Container = ({children}) => {
    return (
        <div className="w-[95%] md:w-[90%] mx-auto max-w-7xl">
            {children}
        </div>
    );
};

export default Container;