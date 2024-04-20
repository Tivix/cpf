export const LadderDetails = ({ ladder, ladderName, band }: any) => {
  return (
    <div className="rounded-2xl bg-white px-20 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-navy-800">
          Band {band}: {ladderName}
        </h2>
        <p className="text-navy-600 text-sm">Salary range: {ladder.salaryRange}</p>
      </div>
    </div>
  );
};
