import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          'url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)',
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Search properties for sale <br /> in Bangladesh
        </h1>
        <p className='pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{' '}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
        <Link
          to='/products'
          className='inline-block'
        >
          <div className={`${styles.button} mt-5`}>
            <span className='text-[#fff] font-[Poppins] text-[18px]'>
              Property
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
