import styled from "styled-components";
import { Preloader } from "../../common/Preloader";
import { useSelector } from "react-redux";
import ProfileStatus from "./ProfileStatus";

const ProfilInfo = (props) => {
  const profile = useSelector((state) => state.profilePage.profile);

  if (!profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div>
        <div>
          <ProfileImg
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE9eOu1gua3oss0b6xGmaUEvMu3boiiooinQ&usqp=CAU"
            alt=""
          />
        </div>
        <DescriptionBlock>avatart description</DescriptionBlock>
        <ProfileStatus userId={props.userId}/>
        <div>
          <h2>{profile.fullName}</h2>
          <img src={profile.photos.large} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ProfilInfo;

const ProfileImg = styled.img``;

const DescriptionBlock = styled.div`
  padding: 10px;
`;
