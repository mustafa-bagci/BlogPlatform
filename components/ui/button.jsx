import Link from 'next/link';
import clsx from 'clsx'; 

export default function Button({ text, page, className, isLink = true }) {
  const buttonClasses = clsx(
    "transition duration-300 ease-in-out", 
    className
  );

  return isLink ? (
    <Link href={page} aria-label={text}>
      <button className={buttonClasses}>
        {text}
      </button>
    </Link>
  ) : (
    <button className={buttonClasses}>
      {text}
    </button>
  );
}
