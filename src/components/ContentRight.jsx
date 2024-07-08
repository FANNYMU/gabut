import React from 'react';
import '../styles/home.css'

const ContentRight = () => {
    return (
        <div className='flex profileRight'>
            <img className='profileContentRight' src="https://media-cgk2-1.cdn.whatsapp.net/v/t61.24694-24/95077059_753738248495617_5015989933540350173_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_Q5AaIIssp21bE5plNeEUyd0btFpYwM5o1BOuDUGA8rwdn19-&oe=6697D386&_nc_sid=e6ed6c&_nc_cat=111" style={{ borderRadius: "50%" }} alt="" width={52} />
            <h1 className='titleRight text-lg'>TutorWeb.ID (Discussion)</h1>
        </div>
    );
}

export default ContentRight;
