const AnalysisCard = ({ icon, num, title, description, articlesNumber }) => {
  return (
    <div
      className={`${articlesNumber?"hover:scale-105  hover:border-[1px] hover:border-blue-600":"shadow-lg  hover:translate-y-[-5px]"} flex flex-col justify-center items-center gap-4 text-center rounded-2xl bg-white p-6  transition-all duration-300`}
    >
      {icon}
      <div>
        {num && (
          <>
            <h3 className="text-lg font-semibold">+{num}</h3>
            <p className="text-gray-600">{title}</p>
          </>
        )}
        {!num && description && (
          <>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </>
        )}
        {articlesNumber && (
          <>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-600">{articlesNumber} articles</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalysisCard;
