import { lightest_grey } from "lib/style/colorPalette";
import React from "react";
import { Background, BannerTitle } from "styled";
import User from "./User";
import { useSelector } from "react-redux";

export default function UserRecommend({ users }) {
  const myId = useSelector((state) => state.user.userId);
  return (
    <Background style={{ gap: 20 }}>
      <BannerTitle>나와 잘 맞을 것 같은 사용자</BannerTitle>
      {users.map((data, index) => {
        return (
          <React.Fragment key={data.userId}>
            {data.userId !== myId && <User user={data} />}
            {index !== users.length - 1 && (
              <div
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: lightest_grey,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </Background>
  );
}
