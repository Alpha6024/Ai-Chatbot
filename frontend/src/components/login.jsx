import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";

export default function Login() {
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const [userName, setUserName] = useState("");
  const [aiName, setAiName] = useState("");

  const { rive, RiveComponent } = useRive({
    src: "/loginteddy.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  const successTrigger = useStateMachineInput(
    rive,
    "State Machine 1",
    "success"
  );

  const failTrigger = useStateMachineInput(
    rive,
    "State Machine 1",
    "fail"
  );

  const handsUpBool = useStateMachineInput(
    rive,
    "State Machine 1",
    "hands_up"
  );

  const handleEnter = () => {
    if (!userName.trim() || !aiName.trim()) {
      failTrigger?.fire();   
      setShowError(true);      
      return;
    }

    successTrigger?.fire();  

    setTimeout(() => {
      navigate("/chatbot", {
        state: { userName, aiName },
      });
    }, 700);
  };

  const handleFocus = () => {
    if (handsUpBool) handsUpBool.value = true;
  };

  const handleBlur = () => {
    if (handsUpBool) handsUpBool.value = false;
  };

  return (
    <div className="h-screen w-full bg-white flex justify-center items-center gap-5">

      {showError && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md text-center">
            <h2 className="font-semibold mb-4">
              Please fill all fields
            </h2>
            <button
              onClick={() => setShowError(false)}
              className="px-4 py-2 bg-emerald-400 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="h-[78vh] w-[27vw] bg-emerald-400 p-2 flex flex-col items-center justify-center gap-4">
        <div className="h-40 w-40 rounded-full overflow-hidden bg-white">
          <RiveComponent className="w-full h-full" />
        </div>

        <div className="h-[46vh] w-[25vw] bg-white font-bigt rounded-md flex flex-col items-center justify-center font-extrabold text-6xl">
          <div className="text-red-500">THINK</div>
          <div className="text-blue-500">ASK</div>
          <div className="text-yellow-500">BUILD</div>
        </div>
      </div>

      <div className="h-[78vh] w-[35vw] p-2 flex flex-col items-center justify-center bg-emerald-400">
        <div className="h-[10vh] w-[32vw] bg-white text-2xl font-herofont flex items-center justify-center">
          AI-CHATBOT
        </div>

        <div className="h-[60vh] w-[32vw] bg-white flex flex-col items-center">
          <div className="h-[5vh] flex items-center font-semibold text-sm">
            WELCOME USER
          </div>

          <div className="h-[52vh] font-textf flex flex-col items-center justify-center">
            <div className="h-[35vh] text-sm">
              <div className="mb-3">
                <h2>Enter Your Name :</h2>
                <input
                  className="h-[5vh] w-[25vw] border-b outline-none"
                  value={userName}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div>
                <h2>Enter AI-Agent Name :</h2>
                <input
                  className="h-[5vh] w-[25vw] border-b outline-none"
                  value={aiName}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(e) => setAiName(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleEnter}
              className="h-[4vh] w-[7vw] bg-emerald-400 hover:bg-emerald-300 rounded-md font-mono"
            >
              ENTER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
