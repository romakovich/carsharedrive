import React from 'react';
import ReviewSlideShow from './ReviewSlideShow';
import test from '../../../Assets/img/Home-page/review0.svg';
import {reviewer} from './ReviewData';

const Review = () => {
    let [count, setCount] = React.useState(0);

    return (
    <section className="review">
        <div className="review__container">
            <h2>Отзывы клиентов</h2>
            <div className="slide__show">
                <div className="icon-arrow" onClick={()=> count!=0 ? setCount(count - 1) : setCount(3)}/>
                <div className="slide__show-rect">
                    {[0,1,2,3].map(el => { return <div key={el} className={count == el ? "wrapper is-active" : "wrapper"}>
                        <ReviewSlideShow img={reviewer[el].img} name={reviewer[el].name} city={reviewer[el].city} monolog={reviewer[el].monolog}/>
                    </div> })}
                </div>
                <div className="icon-arrow" onClick={()=> count!=3 ? setCount(count + 1) : setCount(0)}/>
            </div>
            <div className="review__container__circles">
                {[0,1,2,3].map(el => { return <div key={el} className={count == el ? "review__container__circles-item is-active" : "review__container__circles-item"} 
                onMouseEnter={()=> setCount(el)}/> })}
            </div>
            <img src={test} style={{display: "none"}}/>
        </div>
    </section>
    )
};

export default Review;