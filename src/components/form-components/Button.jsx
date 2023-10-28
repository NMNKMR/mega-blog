import {ThreeDots} from 'react-loader-spinner'

function Button({
    children,
    type='button',
    textColor='text-white',
    bgColor='bg-blue-600',
    className='',
    loaderState=false,
    ...props
}) {
  return (
    <button className={`px-4 py-2 flex justify-center rounded-lg ${textColor} ${bgColor} ${className}`} type={type} {...props}>
      {!loaderState ?
         children  : <ThreeDots
          height="25"
          width="25"
          radius="9"
          color="white"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />}
    </button>
  )
}

export default Button