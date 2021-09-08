export const yandexMarker = (el, chat) => {
    return {                            
        balloonContent: !chat && 
        `
        <div style="display: flex; flex-direction: column">
            <div style="background: url(${el.photosCars[0]}); background-size: cover; background-position: center; width: 260px; height: 160px; border-radius: 8px"></div>
            
            <div style="margin-top: 20px; margin-left: 20px; margin-bottom: 20px">
                <div style="font-size: 16px; font-family: Roboto; font-weight: 600">${el.brand} ${el.model}, ${el.year}</div>
                <div style="display: flex; font-size: 14px; font-family: Roboto; margin-top: 8px"> 
                    <div>${el.price} ₽ в сутки</div>
                    <div style="margin-left: auto; margin-right: 20px"><span style="color:#F2C94C">★ </span>${el.rating} (12)</div>

                </div>    
            </div>
        </div>
        `,
        iconContent: `<b>${el.price} ₽</b>`
    }
}