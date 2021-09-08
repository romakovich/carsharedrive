import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import Header from '../../Containers/Header/Header';
import OnSubmit from '../../Containers/Registration/Step1/OnSubmit';
import Step1Forms from '../../Containers/Registration/Step1/Step1Forms';
import CloudContainer from '../../Containers/Registration/Step3-CloudContainer/CloudContainer';
import PhotoAvatar from '../../Containers/Registration/Step2/PhotoAvatar';
import BackPageArrow from '../Global/BackPageArrow/BackPageArrow';

export const Registration = ({ 
    photosDoc, 
    warning, 
    isStep1, isStep2, isStep3, isFinish,
    setStep1, setStep2, setStep3,
     }) => {

    useEffect(() => { 
        isStep3 ? "SkillDrive. Регистрация. 3 шаг" 
        : isStep2 ? document.title="SkillDrive. Регистрация. 2 шаг" 
        : document.title="SkillDrive. Регистрация. 1 шаг"; 
    });

if(isFinish) return ( <Redirect to="/success"/> )
return (
<>
<div className={warning ? "warning is-active" : "warning"}>{warning}</div>
<Header />
<section className="registration">
    <div className="registration__container">
        <BackPageArrow isStep1={isStep1} isStep2={isStep2} isStep3={isStep3}
        setStep1={setStep1} setStep2={setStep2} setStep3={setStep3}/>

        <div className="registration__container-step">
        {isStep3 ? "Шаг 3 из 3" 
        : isStep2 ? "Шаг 2 из 3" 
        : "Шаг 1 из 3"}</div>
        <h1>
            {isStep3 ? "Загрузите документы" 
            : isStep2 ? "Загрузите селфи" 
            : "Расскажите о себе"}</h1>
        {!isStep1 ? 
        <>
        <span className="registration__container-description">
            { isStep2 ? "Смотрите прямо в камеру, без солнцезащитных очков и головных уборов." 
            : "Разворот паспорта и страницу с пропиской, а также водительское удостоверение с двух сторон." }
        </span>
        </> : ""}
        {isStep1 ? <Step1Forms /> : ""}
        {isStep2 ? <PhotoAvatar /> : ""}
        {isStep3 ? <CloudContainer photos={ photosDoc }/> : ""}
        {!isStep1 && <OnSubmit /> }
    </div>
</section>

</>
)}
 