/* eslint-disable react/prop-types */
import { HashLoader } from "react-spinners"


const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[100vh]'}
      flex 
      flex-col 
      justify-center 
      items-center bg-white dark:bg-[#282834]`}
    >
      <HashLoader size={20} color='#3AA2AC' />
    </div>
  )
}

export default LoadingSpinner;