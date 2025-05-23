import React from "react";

const RankProgress = ({ data }) => {
  const steps = [
    { id: 1, label: "FC" },
    { id: 2, label: "FI" },
    { id: 3, label: "FR" },
    { id: 4, label: "BD" },
    { id: 5, label: "BR" },
    { id: 6, label: "CT" },
    { id: 7, label: "MQ" },
    { id: 8, label: "DU" },
  ];

  const currentRank = data?.selectRank;
  console.log(currentRank);
  
  const currentStep =
    steps.find((step) => step.label === currentRank)?.id || 0;

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="mb-4 font-semibold text-lg">Rank Achieved</div>
      <div className="overflow-x-auto">
        <div className="flex items-center min-w-[700px] sm:min-w-full">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <React.Fragment key={step.id}>
                {index !== 0 && (
                  <div
                    className={`flex-1 h-1 -mt-5 ${
                      isCompleted || isCurrent
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                )}

                <div className="flex flex-col items-center relative z-10 min-w-[30px]">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white 
                      ${isCompleted ? "bg-green-500" : isCurrent ? "bg-blue-500" : "bg-gray-300"}`}
                  >
                    {step.id}
                  </div>
                  <span className="mt-1 text-sm font-semibold whitespace-nowrap">
                    {step.label}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RankProgress;
