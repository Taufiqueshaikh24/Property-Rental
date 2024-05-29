import Link from "next/link";


const Box = ({
    heading , 
    backgroundColor , 
    textColor, 
    buttonInfo, 
    children
}) => {
    return (
        <div className={ `${backgroundColor} p-6 rounded-lg shadow-lg md:shadow-md"` }>
            <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
            <p className={ `${textColor} mt-2 mb-4 ` }>
             {children}
            </p>
            <Link
              href={buttonInfo.link}
              className={ `${buttonInfo.color} inline-block  text-white rounded-lg px-4 py-2 hover:opacity-80`}
            >
              {buttonInfo.text}
            </Link>
        </div>
    )
};

export default Box; 