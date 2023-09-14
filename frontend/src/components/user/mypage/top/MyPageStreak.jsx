import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import http from "api/commonHttp";
import Streak from "react-github-contribution-calendar"
import {color} from "lib/style/colorPalette";

export default function MyPageStreak({userId}) {
    const [data, setData] = useState({});
    const colors = ["lightgray", color.streakFirst, color.streakSecond, color.streakThird, color.streakFourth, color.streakFifth]
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    const weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    let now = new Date();
    const until = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
    useEffect(() => {
        http.get(`user/streak/${userId}`)
        .then(({data}) => {
            console.log(data);
            setData(variate(data));
        })
        .catch((err) => {
            console.log(err);
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const variate = (res) => {
        let k = {};
        for(let v of res) {
            k[v.createAt] = v.weight
        }
        return k;
    }
    return (
        <StreakContainer>
           <Streak weekNames={weekNames} monthNames={monthNames} panelAttributes={{rx: 3, ry: 3}} values={data} panelColors={colors} until={until}>

           </Streak>
        </StreakContainer>
    );
}


const StreakContainer = styled.div`
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    // background-color: red;
    width: 100%;
`;