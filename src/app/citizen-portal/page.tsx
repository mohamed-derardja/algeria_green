"use client";

import { useState } from "react";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import GeoJSONExporter from "@/components/GeoJSONExporter";
import Breadcrumb from "@/components/Breadcrumb";
import {
  Trees,
  Award,
  Flame,
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  Trophy,
  ChevronRight,
  Sparkles,
  Droplets,
  Medal,
  GraduationCap,
  Sprout,
  Heart
} from "lucide-react";
import { Progress, Tag } from "antd";
import { useToast } from "@/components/ToastProvider";

export default function CitizenPortalPage() {
  const [xp, setXp] = useState(2400);
  const [claimedReward, setClaimedReward] = useState(false);
  const [joinedMission, setJoinedMission] = useState(false);
  const [volunteerCount, setVolunteerCount] = useState(145);
  const [timeframe, setTimeframe] = useState<"month" | "all">("month");
  const [showExporterModal, setShowExporterModal] = useState(false);
  const toast = useToast();

  const handleClaimReward = () => {
    if (!claimedReward) {
      setXp((prev) => prev + 150);
      setClaimedReward(true);
      toast.success("🎉 Daily XP Reward Claimed!", "+150 XP added to your Sapling Guardian rank.");
    }
  };

  const handleJoinMission = () => {
    if (!joinedMission) {
      setJoinedMission(true);
      setVolunteerCount((prev) => prev + 1);
    } else {
      setJoinedMission(false);
      setVolunteerCount((prev) => prev - 1);
    }
  };

  const monthlyLeaders = [
    { rank: 1, name: "Ahmed Y.", title: "Master Planter", xp: "4,200 XP", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZv8ijyS2qthPXqAEX17f2Pmon1nkiUOxuoKn2FQ9uX8P_SBsUWut1-i3MxSrn3lKTG_Yew8367iNAeMmthqPOwm1JBQIaFa6Q_GwqICpwqgbzQ9ttX77toALoK2ITGnhPzb5a3oik6q-z3rLXQ2886Hsy5xs4tWAbvxFG66Qnv9R_T8Bdd-tP5wI8ZEf-siNoy4sjfZfLLY95CrfBz6wq9H4bajEjOKiMnwSVSfjwg8Ki7LFjS2ke", isTop: true },
    { rank: 2, name: "Fatima B.", title: "Forest Ranger", xp: "3,850 XP", initial: "F", isTop: false },
    { rank: 3, name: "Lina M.", title: "Sapling Guardian", xp: "3,120 XP", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8fK4-3KLp25lyT9_gs_FcBnatGvontGhWYkT3bQ6AwvbAJ7KqBG8B-us-AbsPS-YExjUBAcKOmSTOJz01nP4mabCcNApCa_1MW7hxxIZ1Nm-aJvVaUYAdyAch5Wmv05noLOFmthMFesN60vgcFlf9HA6usV0pcW4iBmWdyPOQuu0cSg2MUo8Zf_CX2u-A8wG7_rjpO4ozRL6-H9iHcMv8fOCn8AWwSO451a6Uh38Gdlb-cOwezWA0", isTop: false },
  ];

  const allTimeLeaders = [
    { rank: 1, name: "Dr. Karim H.", title: "Aurès Legend", xp: "18,900 XP", initial: "K", isTop: true },
    { rank: 2, name: "Ahmed Y.", title: "Master Planter", xp: "14,500 XP", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZv8ijyS2qthPXqAEX17f2Pmon1nkiUOxuoKn2FQ9uX8P_SBsUWut1-i3MxSrn3lKTG_Yew8367iNAeMmthqPOwm1JBQIaFa6Q_GwqICpwqgbzQ9ttX77toALoK2ITGnhPzb5a3oik6q-z3rLXQ2886Hsy5xs4tWAbvxFG66Qnv9R_T8Bdd-tP5wI8ZEf-siNoy4sjfZfLLY95CrfBz6wq9H4bajEjOKiMnwSVSfjwg8Ki7LFjS2ke", isTop: false },
    { rank: 3, name: "Yasmine A.", title: "Green Barrier Pioneer", xp: "12,800 XP", initial: "Y", isTop: false },
  ];

  const currentLeaders = timeframe === "month" ? monthlyLeaders : allTimeLeaders;

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      {/* Shared Fixed Top Navigation Bar */}
      <TopNavBar />
      <Breadcrumb />

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-container-padding pt-4 pb-16">
        {/* Header Section */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary dark:text-primary-fixed text-xs font-semibold uppercase tracking-wider mb-3">
            <Sprout className="w-3.5 h-3.5" />
            Citizen Science & Volunteer Hub
          </div>
          <h1 className="font-display-lg text-display-lg text-on-background font-bold tracking-tight mb-2">
            Volunteer Hub
          </h1>
          <p className="text-on-surface-variant max-w-3xl text-sm md:text-base leading-relaxed">
            Join thousands of Algerian citizens restoring native landscapes. Track your impact, join local re-afforestation missions, and climb the national community leaderboard.
          </p>
        </header>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Bento Grid for Stats & Gamification */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Bento Row 1: Impact & Level Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* User Impact Card */}
              <div className="glass-card rounded-card p-6 shadow-md border border-outline-variant/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                      <Trees className="w-5 h-5" />
                    </div>
                    <h2 className="font-title-md text-title-md text-on-surface font-bold">Your Impact</h2>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-data-numeral text-[48px] leading-none text-primary font-bold">124</span>
                    <span className="text-on-surface-variant font-label-sm text-xs uppercase tracking-wider">Trees Logged & Planted</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant font-medium">⭐ Top 15% contributor this month</span>
                  <a className="text-primary font-semibold hover:underline flex items-center gap-1" href="#details">
                    View details <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Next Level Card */}
              <div className="bg-primary text-on-primary rounded-card p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-8 -top-8 opacity-20 pointer-events-none">
                  <Trophy className="w-36 h-36" />
                </div>
                <div className="relative z-10">
                  <span className="text-[11px] uppercase tracking-wider text-primary-fixed-dim font-mono font-bold block mb-1">
                    Community Rank
                  </span>
                  <h2 className="font-title-md text-xl font-bold mb-1">Level 4: Sapling Guardian</h2>
                  <p className="text-primary-fixed-dim text-xs mb-4">
                    {claimedReward ? "XP Reward Claimed! Keep planting." : "You are 600 XP away from reaching Level 5!"}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-2">
                    <Progress
                      percent={Math.min(Math.round((xp / 3000) * 100), 100)}
                      strokeColor={{ "0%": "#a3f69c", "100%": "#ffffff" }}
                      size="small"
                      showInfo={false}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-primary-fixed-dim font-mono">
                    <span>{xp} XP</span>
                    <span>3,000 XP</span>
                  </div>
                </div>

                <button
                  onClick={handleClaimReward}
                  disabled={claimedReward}
                  className={`mt-4 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all w-max relative z-10 flex items-center gap-1.5 cursor-pointer shadow-md ${
                    claimedReward
                      ? "bg-primary-fixed/40 text-primary-fixed cursor-not-allowed opacity-80"
                      : "bg-primary-fixed text-on-primary-fixed hover:bg-secondary-fixed active:scale-95"
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  {claimedReward ? "Daily Reward Claimed (+150 XP)" : "Claim Daily Reward (+150 XP)"}
                </button>
              </div>
            </div>

            {/* Badges Section */}
            <div className="glass-card rounded-card p-6 shadow-md border border-outline-variant/30">
              <h3 className="font-title-md text-lg text-on-surface font-bold mb-4 flex items-center gap-2">
                <Medal className="w-5 h-5 text-primary" />
                Recent Earned Badges
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 hover:bg-surface-container transition-all cursor-pointer group">
                  <div className="w-14 h-14 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                    <Trees className="w-7 h-7" />
                  </div>
                  <span className="font-label-sm text-xs font-semibold text-center text-on-surface">First Forest</span>
                  <span className="text-[10px] text-on-surface-variant font-mono mt-0.5">Batna Cedar</span>
                </div>

                <div className="flex flex-col items-center p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 hover:bg-surface-container transition-all cursor-pointer group">
                  <div className="w-14 h-14 bg-tertiary-container text-on-tertiary-container rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                    <Droplets className="w-7 h-7" />
                  </div>
                  <span className="font-label-sm text-xs font-semibold text-center text-on-surface">Drought Relief</span>
                  <span className="text-[10px] text-on-surface-variant font-mono mt-0.5">Djelfa Belt</span>
                </div>

                <div className="flex flex-col items-center p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 hover:bg-surface-container transition-all cursor-pointer group">
                  <div className="w-14 h-14 bg-surface-variant text-on-surface-variant rounded-full flex items-center justify-center mb-3 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all shadow-sm">
                    <Trophy className="w-7 h-7" />
                  </div>
                  <span className="font-label-sm text-xs font-semibold text-center text-on-surface-variant group-hover:text-on-surface">Local Hero</span>
                  <span className="text-[10px] text-on-surface-variant font-mono mt-0.5">50 Logs Milestone</span>
                </div>

                <div className="flex flex-col items-center p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 hover:bg-surface-container transition-all cursor-pointer group">
                  <div className="w-14 h-14 bg-surface-variant text-on-surface-variant rounded-full flex items-center justify-center mb-3 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all shadow-sm">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <span className="font-label-sm text-xs font-semibold text-center text-on-surface-variant group-hover:text-on-surface">Mentor</span>
                  <span className="text-[10px] text-on-surface-variant font-mono mt-0.5">Guided 5 Rangers</span>
                </div>
              </div>
            </div>

            {/* Upcoming Mission Spotlight */}
            <div className="glass-card rounded-card overflow-hidden shadow-lg border border-outline-variant/30 flex flex-col md:flex-row relative">
              <div className="md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-error-container text-on-error-container rounded-full text-xs font-bold mb-4">
                    <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                    Urgent National Mission
                  </div>
                  
                  <h3 className="font-title-md text-xl md:text-2xl text-on-surface font-bold mb-2">
                    Batna Aurès Reforestation Drive
                  </h3>
                  
                  <p className="text-on-surface-variant text-xs md:text-sm mb-6 leading-relaxed">
                    Join the upcoming weekend campaign to restore the Aurès cedar slopes in Batna. Volunteers will plant 5,000 Atlas Cedar saplings with real-time GPS telemetry tagging.
                  </p>

                  <div className="space-y-3 mb-6 text-xs text-on-surface">
                    <div className="flex items-center gap-3 font-medium">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Sat, Oct 14 - Sun, Oct 15</span>
                    </div>
                    <div className="flex items-center gap-3 font-medium">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>Bouzina Valley, Batna Massif</span>
                    </div>
                    <div className="flex items-center gap-3 font-medium">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-mono">{volunteerCount} / 200 Volunteers Joined</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleJoinMission}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                    joinedMission
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-primary text-on-primary hover:bg-primary-container"
                  }`}
                >
                  {joinedMission ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      You Are Registered for this Mission!
                    </>
                  ) : (
                    "Join Mission Now"
                  )}
                </button>
              </div>

              {/* Map & Visual Container */}
              <div className="md:w-1/2 min-h-[260px] relative bg-surface-container-high overflow-hidden">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Batna Reforestation Map View"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB2LTQX6SBomOQ2sIRZqTN7JKL1ljiHIrTvRaSs8hlR-E7caJA6inpasUkcVzuY9AT2fWEX_tOgCL_a_KJjd6-XE6rxSES2PZiuvDTYAiERaqk8Qn3eD_zTCn_5WRLWWW1MxTgBVAOIG212EmpGNUUN2cCT8e1BQDPIUHg0LqHvfy37mW9savR6vpmy_ZK-icY6L2RGHx0NjLPV4uN0PLAHul4VS2ZhAUcvLEaydC01dYXrWHz4c-o"
                />
                
                {/* Overlay Floating Friends Widget */}
                <div className="absolute bottom-4 right-4 bg-surface/90 dark:bg-surface-container-high/90 backdrop-blur-md p-3 rounded-xl border border-outline-variant/30 shadow-lg flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary-container border-2 border-surface flex items-center justify-center text-xs font-bold text-on-primary-container">
                      A
                    </div>
                    <div className="w-8 h-8 rounded-full bg-secondary-container border-2 border-surface flex items-center justify-center text-xs font-bold text-on-secondary-container">
                      F
                    </div>
                    <div className="w-8 h-8 rounded-full bg-tertiary-container border-2 border-surface flex items-center justify-center text-xs font-bold text-on-tertiary-container">
                      +12
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-on-surface">14 Local Friends Going</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Leaderboard & Secondary Activities */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Community Leaderboard */}
            <div className="glass-card rounded-card p-6 shadow-md border border-outline-variant/30 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-title-md text-base text-on-surface font-bold flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  Community Leaders
                </h3>

                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value as "month" | "all")}
                  className="bg-surface-container dark:bg-surface-container-high text-xs rounded-lg border border-outline-variant/30 py-1 pl-2 pr-6 outline-none focus:ring-1 focus:ring-primary cursor-pointer text-on-surface"
                >
                  <option value="month">This Month</option>
                  <option value="all">All Time</option>
                </select>
              </div>

              <div className="space-y-3 mb-4">
                {currentLeaders.map((leader) => (
                  <div
                    key={leader.rank}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                      leader.isTop
                        ? "bg-secondary-container/30 border border-secondary-container"
                        : "hover:bg-surface-container dark:hover:bg-surface-container-highest border border-outline-variant/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 text-center font-mono font-bold text-sm text-primary">
                        #{leader.rank}
                      </div>

                      {leader.avatar ? (
                        <img
                          src={leader.avatar}
                          alt={leader.name}
                          className="w-9 h-9 rounded-full object-cover border border-primary/30"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-tertiary-container text-on-tertiary-container font-bold flex items-center justify-center text-xs">
                          {leader.initial}
                        </div>
                      )}

                      <div>
                        <div className="font-semibold text-xs text-on-surface">{leader.name}</div>
                        <div className="text-[11px] text-on-surface-variant font-mono">{leader.title}</div>
                      </div>
                    </div>

                    <div className="font-mono text-xs font-bold text-primary">
                      {leader.xp}
                    </div>
                  </div>
                ))}

                {/* Divider */}
                <div className="flex items-center py-1">
                  <div className="flex-grow border-t border-outline-variant/30"></div>
                  <span className="mx-3 text-[11px] text-on-surface-variant font-mono">Your Rank</span>
                  <div className="flex-grow border-t border-outline-variant/30"></div>
                </div>

                {/* Current User Rank */}
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-xl border border-primary/40">
                  <div className="flex items-center gap-3">
                    <div className="w-6 text-center font-mono font-bold text-xs text-primary">#42</div>
                    <img
                      className="w-9 h-9 rounded-full object-cover border-2 border-primary"
                      alt="Tarek Avatar"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBooEaYSz_DzTIuPQxA1PSxLa3tSdxWzh5g7vIexPYYABMbRFURjBOYOq7PLaE0ubpbWJgARjISieTc4EH6mOFUotji4wEuDVop2rlqoWkL311wTqhnL-0mhzm_VSNzbHXyiQ5syscPTp22wGG73PcqTqF8YGg3bbEavOGRQfnXxJqUTv1UYyIGSYxoLZftpBn2Ov-Y4nAzOREK5qzvuqo9Y9ciSDzyQWHwXoFlcExVO0tjJkQG7gwG"
                    />
                    <div>
                      <div className="font-semibold text-xs text-on-surface">You (Tarek)</div>
                      <div className="text-[11px] text-on-surface-variant font-mono">Sapling Guardian</div>
                    </div>
                  </div>
                  <div className="font-mono text-xs font-bold text-primary">{xp} XP</div>
                </div>
              </div>

              <button className="w-full py-2.5 text-xs text-primary font-semibold border border-primary/30 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer mb-4">
                View Full National Rankings
              </button>

              {/* GeoJSON & KML Data Exporter Button */}
              <button
                onClick={() => setShowExporterModal(true)}
                className="w-full py-2.5 text-xs bg-emerald-600/10 hover:bg-emerald-600 text-emerald-700 dark:text-emerald-300 hover:text-white font-semibold border border-emerald-500/30 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                📥 Export Open GIS Datasets
              </button>

              <GeoJSONExporter
                isOpen={showExporterModal}
                onClose={() => setShowExporterModal(false)}
              />
            </div>

            {/* Quick Actions / Nearby Missions */}
            <div className="glass-card rounded-card p-6 shadow-md border border-outline-variant/30">
              <h3 className="font-title-md text-base text-on-surface font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Nearby Missions
              </h3>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3 p-3 hover:bg-surface-container dark:hover:bg-surface-container-high rounded-xl cursor-pointer transition-colors border border-outline-variant/20 group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <Trees className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xs font-bold text-on-surface">Urban Park Canopy Cleanup</h4>
                    <p className="text-[11px] text-on-surface-variant font-mono">Algiers • 5km away</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary" />
                </li>

                <li className="flex items-center gap-3 p-3 hover:bg-surface-container dark:hover:bg-surface-container-high rounded-xl cursor-pointer transition-colors border border-outline-variant/20 group">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xs font-bold text-on-surface">Soil Moisture Sensor Sampling</h4>
                    <p className="text-[11px] text-on-surface-variant font-mono">Blida • 12km away</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Shared Footer Component */}
      <Footer />
    </div>
  );
}
