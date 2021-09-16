import React, {useState} from 'react';
import EmojiItem from './EmojiItem';
import { emojiList } from './emojiList';
import EmojiMenuItem from './EmojiMenuItem';
import chatBot from '../../Assets/img/Messages/chatBot.svg';
import okRent from '../../Assets/img/Messages/okRent.svg';
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { yandexMarker } from '../RentPage/yandexMarker';

const Message = ({
    payload, toUser, 
    updateTrip, updateMessage
}) => {

    const [rate, setRate] = useState(-1);
    const [emojiMenu, setEmojiMenu] = useState(false);
    const [review, setReview] = useState(false);
    const [reviewValue, setReviewValue] = useState("")

    let botText = "",
    botButtonText = false;
    const time = `${new Date(payload.time).getHours()}:${new Date(payload.time).getMinutes()}`;
    const isOwner = payload.fromUser == localStorage.getItem("userMail");
    
    switch (payload.chatBot) {
        case "rentStart":
            botText = "Аренда начата";
            break;
        case "rentEnd":
            botText = "Аренда завершена";
            break;
        case "setRentEnd":
            botText = "Вы начали аренду. Автомобиль необходимо вернуть по тому же адресу 8 июня";
            botButtonText = "Завершить аренду";
            break;
        case "setRezerv":
            botText = "Бронирование подтверждено";
            break;
        case "setRentOwner":
            botText = "Подтвердите, если одобряете заявку на бронирование";
            botButtonText = "Забронировать";
            break;
        case "setRentClient":
            botText = "Подтвердите, когда начнёте аренду";
            botButtonText = "Начать аренду";
            break;
        case "map":
            botText = `Автомобиль будет вас ждать по адресу: ${payload.lastTrip.car.street}`;
            break;
        case "rate":
            botText = review ? "" : "Оцените аренду. Всё ли хорошо? Оставьте отзыв автомобилю и владельцу, и вы сможете увидеть отзыв о себе";
            botButtonText = review ? "Отправить отзыв" : "Написать отзыв";
            break;
        case "rateOk":
            botText = "Отзыв отправлен";
            break;
        default:
            break;
    }

    return (<>
    
    <div className={isOwner 
        ? "message__container"
        : "message__container not-owner"}
        style={{display: payload.chatBot && isOwner && "none"}}>
        {!isOwner ? <img className="message__container-avatar" 
        src={payload.chatBot ? chatBot : `http://localhost:8000/img-car/${toUser}/avatar/avatar.jpg`}

        >
        </img> : ""}
        <div className={isOwner 
            ? "message__container-text" 
            : "message__container-text not-owner"}>
            {payload.chatBot 
            ? <div className="message__container-text-bot">
                {!botButtonText && payload.chatBot != "map" ? <img src={okRent}></img> : ""}
                <span
                style={{color: !botButtonText && payload.chatBot != "map" && "#61A199",
                fontWeight: !botButtonText && payload.chatBot != "map" ? "500" : "normal"}}>
                    {botText} {payload.chatBot == "map" ? <p style={{fontWeight: "500"}}>{payload.lastTrip.car.city}</p> : ""}
                </span>
                
            </div> : ""}

                {review 
                ? <textarea className="message__container-text-review" value={reviewValue}
                onChange={e=>{setReviewValue(e.target.value)}}>
                </textarea> : ""}

                {payload.chatBot == "rate" 
                ? <div className="message__container-text-rate">
                    {[0,1,2,3,4].map((el, i) => {
                        return <div className={i <= rate ? "rate-item select" : "rate-item"}
                        onClick={()=>{
                            setRate(el);
                        }}>★</div> 
                    })}
                </div> : ""}


                {payload.chatBot == "map" 
                ?   <YMaps >
                        <div 
                        className="yandex-map" 
                        style={{marginTop: "10px", 
                        marginLeft: "11px"}}>
                            <Map 
                            defaultState={{ center: payload.lastTrip.car.geo, 
                                zoom: 14 }} 
                            modules={[
                            "layout.ImageWithContent", 
                            'geoObject.addon.balloon', 
                            'geoObject.addon.hint',
                            ]}>
                            <Placemark
                                geometry={payload.lastTrip.car.geo} 
                                properties={yandexMarker(payload.lastTrip.car, true)}
                                options={{
                                    preset: 'islands#grayStretchyIcon',
                                }}/>
                            </Map>
                        </div>
                </YMaps> : ""}

            {botButtonText ? <div className="message__container-text-button">
                <span 
                onClick={()=>{
                    
                    if(payload.chatBot != "rate") {
                        updateTrip(payload);
                        
                    } else {
                        if(review) {
                            updateTrip(payload, rate, reviewValue);
                            setReview(false);
                        } else {
                            setReview(true);
                        }
                    }               
                }}>{botButtonText}</span></div> : ""}
            {payload.message}
                {!payload.chatBot ? <div className="under__message">
                    <div className={emojiMenu ? "under__message-menu active" : "under__message-menu"}>
                        {emojiList.map(el=>{
                            return <EmojiMenuItem emoji={el} setEmojiMenu={setEmojiMenu}                             
                            payload={payload} updateMessage={updateMessage}
                            />
                        })}
                    </div>
                    {!emojiMenu ? <div className="under__message-start"
                    onClick={()=>setEmojiMenu(true)}>➥
                    </div> : "⠀"}
                    {!emojiMenu  ? <div className="under__message-emoji">
                        {payload.emoji && payload.emoji.map((el,i)=>{
                            return <EmojiItem key={i} emoji={el} />
                        })}
                    </div> : ""}
                    {!emojiMenu ? <div className="under__message-time">{time}</div> : ""}
            </div> : ""}
        </div>
    </div>
</>)
}

export default Message;