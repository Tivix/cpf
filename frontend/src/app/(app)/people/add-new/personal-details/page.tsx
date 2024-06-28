export default function PersonalDetails() {
  return (
    <div className="h-[2000px]">
      <div className="text-2xl font-semibold leading-7">Personal details</div>
      <div className="grid w-full grid-cols-2 rounded-[20px] bg-white p-8">
        <div>First Name</div>
        <div>Last Name</div>
        <div>Email</div>
      </div>
    </div>
  );
}
