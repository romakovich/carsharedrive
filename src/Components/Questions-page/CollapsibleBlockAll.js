import React, { Fragment } from 'react';
import CollapsibleBlock from './CollapsibleBlock';

const CollapsibleBlockAll = () => (
    <Fragment>
        <CollapsibleBlock question="Могу ли я отменить бронь?"/>
        <CollapsibleBlock question="Могу ли я вернуть деньги, если не подошёл автомобиль?"/>
        <CollapsibleBlock question="Что делать, если случилось ДТП?"/>
        <CollapsibleBlock question="Могу ли я оставить автомобиль в удобном для меня месте?"/>
        <CollapsibleBlock question="Что делать, если собственник просит заплатить ему напрямую?"/>
        <CollapsibleBlock question="Должен ли я заправлять автомобиль?"/>
    </Fragment>
)

export default CollapsibleBlockAll;
