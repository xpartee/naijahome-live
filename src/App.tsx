import { useState } from "react";

const COLORS = {
  navy: "#0A1628",
  navyLight: "#112240",
  gold: "#C9A84C",
  goldLight: "#E8C97A",
  cream: "#F5F0E8",
  white: "#FFFFFF",
  gray: "#8A9BB5",
  grayLight: "#EEF1F6",
  green: "#1A7F5A",
  red: "#C0392B",
  border: "#D8DFE8",
};

const FONT = {
  display: "'Playfair Display', serif",
  body: "'DM Sans', sans-serif",
};

const listings = [
  {
    id: 1,
    title: "3 Bedroom Flat",
    location: "Lekki Phase 1, Lagos",
    price: 2500000,
    period: "yr",
    beds: 3,
    baths: 2,
    sqft: 1400,
    type: "Flat",
    landlord: "Mr. Adebayo Okafor",
    landlordAvatar: "AO",
    verified: true,
    available: true,
    tags: ["Gated Estate", "24hrs Light", "Security"],
    img: "🏢",
  },
  {
    id: 2,
    title: "Self-Contain Studio",
    location: "Wuse 2, Abuja",
    price: 800000,
    period: "yr",
    beds: 1,
    baths: 1,
    sqft: 450,
    type: "Self-Contain",
    landlord: "Mrs. Fatima Aliyu",
    landlordAvatar: "FA",
    verified: true,
    available: true,
    tags: ["Bore Hole", "Pop Ceiling", "Parking"],
    img: "🏠",
  },
  {
    id: 3,
    title: "5 Bedroom Duplex",
    location: "GRA, Port Harcourt",
    price: 5000000,
    period: "yr",
    beds: 5,
    baths: 4,
    sqft: 3200,
    type: "Duplex",
    landlord: "Chief Emeka Nwosu",
    landlordAvatar: "EN",
    verified: false,
    available: true,
    tags: ["Swimming Pool", "Boys Quarter", "CCTV"],
    img: "🏡",
  },
  {
    id: 4,
    title: "Mini Flat",
    location: "Ikeja, Lagos",
    price: 650000,
    period: "yr",
    beds: 1,
    baths: 1,
    sqft: 380,
    type: "Mini Flat",
    landlord: "Alhaji Musa Ibrahim",
    landlordAvatar: "MI",
    verified: true,
    available: false,
    tags: ["Prepaid Meter", "Tiled Floor", "Fence"],
    img: "🏘️",
  },
  {
    id: 5,
    title: "4 Bedroom Terrace",
    location: "Jabi, Abuja",
    price: 4200000,
    period: "yr",
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "Terrace",
    landlord: "Dr. Ngozi Eze",
    landlordAvatar: "NE",
    verified: true,
    available: true,
    tags: ["Smart Home", "Inverter", "Garden"],
    img: "🏗️",
  },
  {
    id: 6,
    title: "2 Bedroom Bungalow",
    location: "New GRA, Enugu",
    price: 550000,
    period: "yr",
    beds: 2,
    baths: 2,
    sqft: 900,
    type: "Bungalow",
    landlord: "Mr. Chukwudi Ani",
    landlordAvatar: "CA",
    verified: false,
    available: true,
    tags: ["Spacious", "Quiet Area", "Water"],
    img: "🏚️",
  },
];

const messages = [
  { id: 1, from: "Mr. Adebayo Okafor", avatar: "AO", preview: "Yes, the flat is still available. When would you like to inspect?", time: "10:32 AM", unread: 2, property: "3 Bedroom Flat, Lekki" },
  { id: 2, from: "Mrs. Fatima Aliyu", avatar: "FA", preview: "I have received your application. Please come with valid ID.", time: "Yesterday", unread: 0, property: "Self-Contain Studio, Wuse 2" },
  { id: 3, from: "Dr. Ngozi Eze", avatar: "NE", preview: "The agent fee has been waived. We can deal directly.", time: "Mon", unread: 1, property: "4 Bedroom Terrace, Jabi" },
];

const myApplications = [
  { id: 1, property: "3 Bedroom Flat, Lekki Phase 1", landlord: "Mr. Adebayo Okafor", status: "Under Review", date: "22 Mar 2026", price: 2500000 },
  { id: 2, property: "Self-Contain Studio, Wuse 2", landlord: "Mrs. Fatima Aliyu", status: "Approved", date: "18 Mar 2026", price: 800000 },
  { id: 3, property: "4 Bedroom Terrace, Jabi", landlord: "Dr. Ngozi Eze", status: "Pending", date: "10 Mar 2026", price: 4200000 },
];

const formatPrice = (n) => `₦${n.toLocaleString("en-NG")}`;

const Avatar = ({ initials, size = 36, color = COLORS.gold }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: color, color: COLORS.navy,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: FONT.body, fontWeight: 700,
    fontSize: size * 0.35, flexShrink: 0,
  }}>
    {initials}
  </div>
);

const Badge = ({ text, color = COLORS.gold }) => (
  <span style={{
    background: color + "22", color: color,
    padding: "2px 10px", borderRadius: 20,
    fontSize: 11, fontWeight: 600, fontFamily: FONT.body,
    border: `1px solid ${color}44`,
  }}>{text}</span>
);

const StatusBadge = ({ status }) => {
  const map = {
    "Approved": { bg: COLORS.green + "22", color: COLORS.green },
    "Under Review": { bg: COLORS.gold + "22", color: COLORS.gold },
    "Pending": { bg: COLORS.gray + "22", color: COLORS.gray },
    "Rejected": { bg: COLORS.red + "22", color: COLORS.red },
  };
  const s = map[status] || map["Pending"];
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: "3px 12px", borderRadius: 20,
      fontSize: 12, fontWeight: 700, fontFamily: FONT.body,
    }}>{status}</span>
  );
};

// ─── CHAT VIEW ───────────────────────────────────────────────────────────────
const ChatView = ({ thread, onBack }) => {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    { from: "them", text: "Hello! I saw your interest in my property.", time: "10:00 AM" },
    { from: "me", text: "Yes please, is the property still available?", time: "10:15 AM" },
    { from: "them", text: thread.preview, time: thread.time },
  ]);

  const send = () => {
    if (!input.trim()) return;
    setMsgs(m => [...m, { from: "me", text: input, time: "Now" }]);
    setInput("");
    setTimeout(() => {
      setMsgs(m => [...m, { from: "them", text: "Thank you for your message. I will get back to you shortly.", time: "Now" }]);
    }, 1200);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 12, background: COLORS.white }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: COLORS.navy }}>←</button>
        <Avatar initials={thread.avatar} size={40} />
        <div>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, color: COLORS.navy, fontSize: 15 }}>{thread.from}</div>
          <div style={{ fontFamily: FONT.body, fontSize: 12, color: COLORS.gray }}>{thread.property}</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 12, background: COLORS.grayLight }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.from === "me" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "75%", padding: "10px 14px", borderRadius: m.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: m.from === "me" ? COLORS.navy : COLORS.white,
              color: m.from === "me" ? COLORS.white : COLORS.navy,
              fontFamily: FONT.body, fontSize: 14, lineHeight: 1.5,
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            }}>
              {m.text}
              <div style={{ fontSize: 10, color: m.from === "me" ? COLORS.gray : COLORS.gray, marginTop: 4, textAlign: "right" }}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: "12px 16px", borderTop: `1px solid ${COLORS.border}`, display: "flex", gap: 10, background: COLORS.white }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Type a message..."
          style={{
            flex: 1, padding: "10px 16px", borderRadius: 24,
            border: `1px solid ${COLORS.border}`, fontFamily: FONT.body,
            fontSize: 14, outline: "none", color: COLORS.navy,
          }}
        />
        <button onClick={send} style={{
          background: COLORS.navy, color: COLORS.gold, border: "none",
          borderRadius: "50%", width: 44, height: 44, cursor: "pointer",
          fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
        }}>➤</button>
      </div>
    </div>
  );
};

// ─── LISTING CARD ─────────────────────────────────────────────────────────────
const ListingCard = ({ item, onClick }) => (
  <div onClick={() => onClick(item)} style={{
    background: COLORS.white, borderRadius: 14,
    border: `1px solid ${COLORS.border}`, overflow: "hidden",
    cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 2px 8px rgba(10,22,40,0.06)",
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(10,22,40,0.12)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 8px rgba(10,22,40,0.06)"; }}
  >
    {/* Image area */}
    <div style={{
      height: 130, background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyLight} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 52, position: "relative",
    }}>
      {item.img}
      {!item.available && (
        <div style={{
          position: "absolute", top: 10, right: 10,
          background: COLORS.red, color: COLORS.white,
          padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, fontFamily: FONT.body,
        }}>Taken</div>
      )}
      {item.available && (
        <div style={{
          position: "absolute", top: 10, right: 10,
          background: COLORS.green, color: COLORS.white,
          padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, fontFamily: FONT.body,
        }}>Available</div>
      )}
    </div>

    <div style={{ padding: "14px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <div style={{ fontFamily: FONT.display, fontSize: 16, fontWeight: 700, color: COLORS.navy, lineHeight: 1.3 }}>{item.title}</div>
        <Badge text={item.type} color={COLORS.navy} />
      </div>
      <div style={{ fontFamily: FONT.body, fontSize: 13, color: COLORS.gray, marginBottom: 10 }}>📍 {item.location}</div>

      <div style={{ display: "flex", gap: 12, marginBottom: 12, fontFamily: FONT.body, fontSize: 13, color: COLORS.gray }}>
        <span>🛏 {item.beds} Bed</span>
        <span>🚿 {item.baths} Bath</span>
        <span>📐 {item.sqft} sqft</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
        {item.tags.map(t => <span key={t} style={{ fontFamily: FONT.body, fontSize: 11, color: COLORS.gray, background: COLORS.grayLight, padding: "2px 8px", borderRadius: 10 }}>✓ {t}</span>)}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: `1px solid ${COLORS.border}` }}>
        <div>
          <span style={{ fontFamily: FONT.display, fontSize: 18, fontWeight: 700, color: COLORS.gold }}>{formatPrice(item.price)}</span>
          <span style={{ fontFamily: FONT.body, fontSize: 12, color: COLORS.gray }}>/{item.period}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Avatar initials={item.landlordAvatar} size={26} />
          {item.verified && <span style={{ fontSize: 14 }} title="Verified Landlord">✅</span>}
        </div>
      </div>
    </div>
  </div>
);

// ─── LISTING DETAIL ───────────────────────────────────────────────────────────
const ListingDetail = ({ item, onBack, onChat, onApply }) => {
  const [applied, setApplied] = useState(false);
  return (
    <div style={{ overflowY: "auto", height: "100%" }}>
      <div style={{
        height: 200, background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyLight} 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 80, position: "relative",
      }}>
        {item.img}
        <button onClick={onBack} style={{
          position: "absolute", top: 16, left: 16,
          background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%",
          width: 36, height: 36, cursor: "pointer", color: COLORS.white, fontSize: 18,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>←</button>
      </div>

      <div style={{ padding: "20px 20px 100px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div style={{ fontFamily: FONT.display, fontSize: 22, fontWeight: 700, color: COLORS.navy, lineHeight: 1.3 }}>{item.title}</div>
          {item.available
            ? <span style={{ background: COLORS.green + "22", color: COLORS.green, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, fontFamily: FONT.body }}>Available</span>
            : <span style={{ background: COLORS.red + "22", color: COLORS.red, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, fontFamily: FONT.body }}>Taken</span>
          }
        </div>

        <div style={{ fontFamily: FONT.body, fontSize: 14, color: COLORS.gray, marginBottom: 16 }}>📍 {item.location}</div>

        <div style={{ fontFamily: FONT.display, fontSize: 28, fontWeight: 700, color: COLORS.gold, marginBottom: 20 }}>
          {formatPrice(item.price)} <span style={{ fontFamily: FONT.body, fontSize: 16, color: COLORS.gray, fontWeight: 400 }}>/ year</span>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[["🛏", item.beds, "Bedrooms"], ["🚿", item.baths, "Bathrooms"], ["📐", item.sqft, "Sq. Ft"]].map(([icon, val, label]) => (
            <div key={label} style={{ background: COLORS.grayLight, borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 20 }}>{icon}</div>
              <div style={{ fontFamily: FONT.body, fontWeight: 700, color: COLORS.navy, fontSize: 16 }}>{val}</div>
              <div style={{ fontFamily: FONT.body, fontSize: 11, color: COLORS.gray }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, color: COLORS.navy, marginBottom: 10 }}>Features & Amenities</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {item.tags.map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.navy + "0D", border: `1px solid ${COLORS.navy}22`, borderRadius: 8, padding: "6px 12px" }}>
                <span style={{ color: COLORS.gold }}>✓</span>
                <span style={{ fontFamily: FONT.body, fontSize: 13, color: COLORS.navy }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Landlord */}
        <div style={{ background: COLORS.grayLight, borderRadius: 14, padding: 16, marginBottom: 20 }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, color: COLORS.navy, marginBottom: 10 }}>Listed By</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar initials={item.landlordAvatar} size={48} />
            <div>
              <div style={{ fontFamily: FONT.body, fontWeight: 700, color: COLORS.navy }}>{item.landlord}</div>
              <div style={{ fontFamily: FONT.body, fontSize: 12, color: COLORS.gray }}>Property Owner · Direct Listing</div>
              {item.verified && <div style={{ fontFamily: FONT.body, fontSize: 12, color: COLORS.green, marginTop: 2 }}>✅ Verified Landlord</div>}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => onChat(item)} style={{
            flex: 1, padding: "14px", borderRadius: 10,
            border: `2px solid ${COLORS.navy}`, background: "transparent",
            color: COLORS.navy, fontFamily: FONT.body, fontWeight: 700, fontSize: 15,
            cursor: "pointer",
          }}>💬 Message</button>
          <button
            onClick={() => { setApplied(true); onApply(item); }}
            disabled={!item.available || applied}
            style={{
              flex: 1, padding: "14px", borderRadius: 10,
              border: "none",
              background: applied ? COLORS.green : (item.available ? COLORS.gold : COLORS.gray),
              color: applied ? COLORS.white : COLORS.navy,
              fontFamily: FONT.body, fontWeight: 700, fontSize: 15,
              cursor: item.available && !applied ? "pointer" : "not-allowed",
            }}
          >{applied ? "✓ Applied" : "Apply Now"}</button>
        </div>
      </div>
    </div>
  );
};

// ─── POST LISTING (LANDLORD DASHBOARD) ───────────────────────────────────────
const LandlordDashboard = () => {
  const [form, setForm] = useState({ title: "", location: "", price: "", type: "Flat", beds: "", baths: "", tags: "" });
  const [posted, setPosted] = useState(false);

  const myListings = [
    { title: "3 Bedroom Flat", location: "Lekki Phase 1, Lagos", price: 2500000, status: "Active", views: 142, applications: 5 },
    { title: "2 Bedroom Flat", location: "Victoria Island, Lagos", price: 3000000, status: "Active", views: 89, applications: 2 },
  ];

  return (
    <div style={{ overflowY: "auto", height: "100%", padding: "0 0 80px" }}>
      {/* Stats */}
      <div style={{ padding: "20px 16px 0" }}>
        <div style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>Landlord Dashboard</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
          {[["2", "Active Listings", COLORS.gold], ["7", "Applications", COLORS.navy], ["231", "Total Views", COLORS.green]].map(([val, label, color]) => (
            <div key={label} style={{ background: color, borderRadius: 12, padding: "14px 10px", textAlign: "center" }}>
              <div style={{ fontFamily: FONT.display, fontSize: 22, fontWeight: 700, color: COLORS.white }}>{val}</div>
              <div style={{ fontFamily: FONT.body, fontSize: 11, color: "rgba(255,255,255,0.8)" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* My listings */}
        <div style={{ fontFamily: FONT.body, fontWeight: 700, color: COLORS.navy, marginBottom: 12 }}>My Listings</div>
        {myListings.map((l, i) => (
          <div key={i} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: FONT.body, fontWeight: 700, color: COLORS.navy, fontSize: 15 }}>{l.title}</div>
                <div style={{ fontFamily: FONT.body, fontSize: 13, color: COLORS.gray }}>📍 {l.location}</div>
                <div style={{ fontFamily: FONT.display, fontSize: 15, color: COLORS.gold, fontWeight: 700, marginTop: 4 }}>{formatPrice(l.price)}/yr</div>
              </div>
              <span style={{ background: COLORS.green + "22", color: COLORS.green, padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, fontFamily: FONT.body }}>{l.status}</span>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${COLORS.border}` }}>
              <span style={{ fontFamily: FONT.body, fontSize: 13, color: COLORS.gray }}>👁 {l.views} views</span>
              <span style={{ fontFamily: FONT.body, fontSize: 13, color: COLORS.navy, fontWeight: 600 }}>📋 {l.applications} applications</span>
            </div>
          </div>
        ))}

        {/* Post New */}
        <div style={{ fontFamily: FONT.body, fontWeight: 700, color: COLORS.navy, margin: "20px 0 12px" }}>Post New Listing</div>
        {posted ? (
          <div style={{ background: COLORS.green + "22", border: `1px solid ${COLORS.green}44`, borderRadius: 12, padding: 20, textAlign: "center" }}>
            <div style={{ fontSize: 40 }}>🎉</div>
            <div style={{ fontFamily: FONT.body, fontWeight: 700, color: COLORS.green, marginTop: 8 }}>Listing Posted Successfully!</div>
            <div style={{ fontFamily: FONT.body, fontSize: 13, color: COLORS.gray, marginTop: 4 }}>Tenants can now find and apply for your property.</div>
            <button onClick={() => setPosted(false)} style={{ marginTop: 12, background: COLORS.navy, color: COLORS.white, border: "none", borderRadius: 8, padding: "10px 20px", fontFamily: FONT.body, cursor: "pointer" }}>Post Another</button>
          </div>
        ) : (
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["Property Title", "title", "e.g. 3 Bedroom Flat"],
              ["Location", "location", "e.g. Lekki Phase 1, Lagos"],
              ["Annual Rent (₦)", "price", "e.g. 2500000"],
              ["Bedrooms", "beds", "e.g. 3"],
              ["Bathrooms", "baths", "e.g. 2"],
              ["Amenities", "tags", "e.g. Gated Estate, 24hrs Light"],
            ].map(([label, key, ph]) => (
              <div key={key}>
                <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 600, color: COLORS.navy, marginBottom: 5 }}>{label}</div>
                <input
                  value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={ph}
                  style={{
                    width: "100%", padding: "10px 12px", borderRadius: 8,
                    border: `1px solid ${COLORS.border}`, fontFamily: FONT.body,
                    fontSize: 14, outline: "none", boxSizing: "border-box", color: COLORS.navy,
                  }}
                />
              </div>
            ))}

            <div>
              <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 600, color: COLORS.navy, marginBottom: 5 }}>Property Type</div>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontFamily: FONT.body, fontSize: 14, color: COLORS.navy, background: COLORS.white }}>
                {["Flat", "Self-Contain", "Duplex", "Bungalow", "Mini Flat", "Terrace", "Mansion"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            <button onClick={() => setPosted(true)} style={{
              background: COLORS.gold, color: COLORS.navy,
              border: "none", borderRadius: 10, padding: "14px",
              fontFamily: FONT.body, fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 4,
            }}>🏠 Post Listing</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export const App = function NaijaHome() {

  const [tab, setTab] = useState("browse");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedListing, setSelectedListing] = useState(null);
  const [chatThread, setChatThread] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const [applications, setApplications] = useState(myApplications);

  const types = ["All", "Flat", "Self-Contain", "Duplex", "Mini Flat", "Bungalow", "Terrace"];

  const filtered = listings.filter(l => {
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.location.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "All" || l.type === filterType;
    return matchSearch && matchType;
  });

  const handleApply = (item) => {
    const newApp = {
      id: applications.length + 1,
      property: `${item.title}, ${item.location}`,
      landlord: item.landlord,
      status: "Pending",
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      price: item.price,
    };
    setApplications(prev => [newApp, ...prev]);
  };

  // If chatting
  if (chatThread) {
    return (
      <div style={{ fontFamily: FONT.body, height: "100vh", display: "flex", flexDirection: "column", background: COLORS.white, maxWidth: 430, margin: "0 auto" }}>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
        <ChatView thread={chatThread} onBack={() => setChatThread(null)} />
      </div>
    );
  }

  // If viewing listing detail
  if (selectedListing && tab === "browse") {
    return (
      <div style={{ fontFamily: FONT.body, height: "100vh", display: "flex", flexDirection: "column", width: "100%", maxWidth: "100vw", margin: 0 }}>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
        <ListingDetail
          item={selectedListing}
          onBack={() => setSelectedListing(null)}
          onChat={(item) => { setSelectedListing(null); setChatThread(messages.find(m => m.avatar === item.landlordAvatar) || { from: item.landlord, avatar: item.landlordAvatar, preview: "Hello, I'm interested in your property.", time: "Now", property: `${item.title}, ${item.location}` }); }}
          onApply={handleApply}
        />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: FONT.body, height: "100vh", display: "flex", flexDirection: "column", width: "100%", maxWidth: "100vw", margin: 0 }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: COLORS.navy, padding: "16px 20px 14px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: FONT.display, fontSize: 22, fontWeight: 700, color: COLORS.gold, letterSpacing: "-0.3px" }}>NaijaHome</div>
            <div style={{ fontFamily: FONT.body, fontSize: 12, color: COLORS.gray }}>Direct Landlord · No Agent Fee</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <button style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", color: COLORS.white, fontSize: 16 }}>🔔</button>
              {notifications > 0 && <div style={{ position: "absolute", top: -2, right: -2, background: COLORS.red, color: COLORS.white, borderRadius: "50%", width: 16, height: 16, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{notifications}</div>}
            </div>
            <Avatar initials="TY" size={36} color={COLORS.gold} />
          </div>
        </div>

        {/* Search - only on browse */}
        {tab === "browse" && (
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by area, type..."
              style={{
                width: "100%", padding: "10px 12px 10px 36px", borderRadius: 10,
                border: "none", background: "rgba(255,255,255,0.12)",
                fontFamily: FONT.body, fontSize: 14, color: COLORS.white,
                outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {tab === "browse" && (
          <div>
            {/* Filter pills */}
            <div style={{ display: "flex", gap: 8, padding: "14px 16px", overflowX: "auto" }}>
              {types.map(t => (
                <button key={t} onClick={() => setFilterType(t)} style={{
                  flexShrink: 0, padding: "6px 16px", borderRadius: 20,
                  border: `1.5px solid ${filterType === t ? COLORS.navy : COLORS.border}`,
                  background: filterType === t ? COLORS.navy : COLORS.white,
                  color: filterType === t ? COLORS.white : COLORS.navy,
                  fontFamily: FONT.body, fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}>{t}</button>
              ))}
            </div>

            <div style={{ padding: "0 16px 16px", fontFamily: FONT.body, fontSize: 13, color: COLORS.gray }}>
              {filtered.length} properties found
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 16px 20px" }}>
              {filtered.map(item => <ListingCard key={item.id} item={item} onClick={setSelectedListing} />)}
            </div>
          </div>
        )}

        {tab === "messages" && (
          <div style={{ padding: "20px 16px" }}>
            <div style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>Messages</div>
            {messages.map(m => (
              <div key={m.id} onClick={() => setChatThread(m)} style={{
                background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12,
                padding: "14px 16px", marginBottom: 10, cursor: "pointer", display: "flex", gap: 12, alignItems: "center",
              }}>
                <Avatar initials={m.avatar} size={48} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <div style={{ fontFamily: FONT.body, fontWeight: 700, color: COLORS.navy, fontSize: 15 }}>{m.from}</div>
                    <div style={{ fontFamily: FONT.body, fontSize: 12, color: COLORS.gray }}>{m.time}</div>
                  </div>
                  <div style={{ fontFamily: FONT.body, fontSize: 12, color: COLORS.gold, marginBottom: 2 }}>🏠 {m.property}</div>
                  <div style={{ fontFamily: FONT.body, fontSize: 13, color: COLORS.gray, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.preview}</div>
                </div>
                {m.unread > 0 && (
                  <div style={{ background: COLORS.navy, color: COLORS.white, borderRadius: "50%", width: 20, height: 20, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{m.unread}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "applications" && (
          <div style={{ padding: "20px 16px" }}>
            <div style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>My Applications</div>
            {applications.map(a => (
              <div key={a.id} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ fontFamily: FONT.body, fontWeight: 700, color: COLORS.navy, fontSize: 15, flex: 1, marginRight: 8 }}>{a.property}</div>
                  <StatusBadge status={a.status} />
                </div>
                <div style={{ fontFamily: FONT.body, fontSize: 13, color: COLORS.gray, marginBottom: 4 }}>👤 {a.landlord}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: `1px solid ${COLORS.border}`, marginTop: 8 }}>
                  <div style={{ fontFamily: FONT.display, fontSize: 16, color: COLORS.gold, fontWeight: 700 }}>{formatPrice(a.price)}/yr</div>
                  <div style={{ fontFamily: FONT.body, fontSize: 12, color: COLORS.gray }}>Applied: {a.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "landlord" && <LandlordDashboard />}

        {tab === "profile" && (
          <div style={{ padding: "30px 20px" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Avatar initials="TY" size={80} color={COLORS.gold} />
              <div style={{ fontFamily: FONT.display, fontSize: 22, fontWeight: 700, color: COLORS.navy, marginTop: 12 }}>Toyeeb Yusuf</div>
              <div style={{ fontFamily: FONT.body, fontSize: 14, color: COLORS.gray }}>Tenant · Kano, Nigeria</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
                <Badge text="Verified Tenant" color={COLORS.green} />
              </div>
            </div>

      {[
             ["📋", "Applications", String(applications.length), COLORS.navy],             
             ["💬", "Messages", "3", COLORS.gold],
             ["❤️", "Saved Listings", "4", COLORS.red],
                                                ].map(([icon, label, count, color]) => (

              <div key={label} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "14px 16px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 20 }}>{icon}</span>
                  <span style={{ fontFamily: FONT.body, fontWeight: 600, color: COLORS.navy }}>{label}</span>
                </div>
                <div style={{ fontFamily: FONT.body, fontWeight: 700, color, fontSize: 18 }}>{count}</div>
              </div>
            ))}

            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16, marginTop: 16 }}>
              <div style={{ fontFamily: FONT.body, fontWeight: 700, color: COLORS.navy, marginBottom: 12 }}>Preferences</div>
              {[["Budget Range", "₦500k – ₦3M / year"], ["Location", "Lagos, Abuja, Kano"], ["Property Type", "Flat, Self-Contain"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${COLORS.border}` }}>
                  <span style={{ fontFamily: FONT.body, color: COLORS.gray, fontSize: 14 }}>{k}</span>
                  <span style={{ fontFamily: FONT.body, color: COLORS.navy, fontWeight: 600, fontSize: 14 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{
        background: COLORS.white, borderTop: `1px solid ${COLORS.border}`,
        display: "flex", justifyContent: "space-around", padding: "10px 0 14px",
        flexShrink: 0,
      }}>
        {[
          ["browse", "🏠", "Browse"],
          ["messages", "💬", "Messages"],
          ["applications", "📋", "Applied"],
          ["landlord", "🏢", "List"],
          ["profile", "👤", "Profile"],
        ].map(([key, icon, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            background: "none", border: "none", cursor: "pointer", gap: 3,
            color: tab === key ? COLORS.navy : COLORS.gray,
          }}>
            <span style={{ fontSize: 22 }}>{icon}</span>
            <span style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: tab === key ? 700 : 400 }}>{label}</span>
            {tab === key && <div style={{ width: 4, height: 4, borderRadius: "50%", background: COLORS.gold }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
export default App;
