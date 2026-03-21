import SettingTabContainer from "./components/SettingTabContainer";

export default function SettingPage() {
  return (
    <section className="flex flex-col h-full w-full bg-white rounded-md sm:p-6 p-3">
      <h1 className="sm:text-xl text-lg font-bold text-[#0F172A]">Settings</h1>

      <SettingTabContainer />
    </section>
  );
}
