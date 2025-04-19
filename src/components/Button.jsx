import React from 'react';

const Button = ({title, id, rightIcon, leftIcon, containerClass}) => {
    return (
        <button
            id={id}
            className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 bg-violet-50 text-black transition-transform duration-300 hover:scale-110 ${containerClass}`}
        >
            {leftIcon}
            <span className={"relative inline-flex overflow-hidden text-xs uppercase"}>
                <div>
                    {title}
                </div>
            </span>
            {rightIcon}
        </button>
    );
};

export default Button;