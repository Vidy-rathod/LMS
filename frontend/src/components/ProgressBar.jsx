const ProgressBar = ({ progress, showPercentage = true, height = 'h-2', color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600',
    red: 'bg-red-600'
  };

  const percentage = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <div
          className={`${height} ${colorClasses[color]} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <p className="text-sm text-gray-600 mt-1 text-right">
          {percentage.toFixed(0)}% Complete
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
