import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { useSelector } from "react-redux";

const RoomPage = () => {
  // const { user } = useSelector((state) => state.profile)
  const { roomId } = useParams();
  const myMeeting = async (element) => {
    const appID = 2000152910;
    const serverSecret = "3515243ed3494d0316cd0dcfdccf7fcf";
    // Data.now() is replaced with userId(from database)
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(), //userId
      "Somnath Roy"          // user?.firstName + " " + user?.lastName User Name
    );
    
    // console.log(kitToken);

    const zc = ZegoUIKitPrebuilt.create(kitToken);

    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          nama: "Copy Link",
          url: `http://localhost:5173/room/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // Group call can possible
      },
      showScreenSharingButton: false,
    });
  };

  return (
    <div className="bg-gray-200 rounded-lg">
      <div className= "w-full h-screen" ref={myMeeting} />
    </div>
  );
};

export default RoomPage;