import React, { useState } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from "recharts";

const userGrowthData = [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 350 },
    { month: "Mar", users: 500 },
    { month: "Apr", users: 800 },
    { month: "May", users: 1200 },
    { month: "Jun", users: 1500 },
];

const revenueData = [
    { month: "Jan", revenue: 3000 },
    { month: "Feb", revenue: 4200 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 6800 },
    { month: "May", revenue: 8900 },
    { month: "Jun", revenue: 12000 },
];

const popularTemplatesData = [
    { name: "Business Card", usage: 120 },
    { name: "Instagram Post", usage: 200 },
    { name: "YouTube Thumbnail", usage: 150 },
    { name: "Flyer", usage: 90 },
    { name: "Resume", usage: 60 },
];

// Mock Data
const usersData = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
];

const templatesData = [
    { id: 1, title: "Business Card" },
    { id: 2, title: "Instagram Post" },
    { id: 3, title: "YouTube Thumbnail" },
];

const assetsData = [
    { id: 1, name: "Logo.png", type: "Image" },
    { id: 2, name: "Intro.mp4", type: "Video" },
    { id: 3, name: "Roboto.ttf", type: "Font" },
];


  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleBan = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, status: u.status === "banned" ? "active" : "banned" } : u
      )
    );
  };

// Section Components
function Dashboard() {
    return (
        <>
            <section className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 shadow rounded">
                    <h2 className="text-lg font-semibold">Total Users</h2>
                    <p className="text-2xl font-bold text-purple-600">1,500</p>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <h2 className="text-lg font-semibold">Templates</h2>
                    <p className="text-2xl font-bold text-purple-600">543</p>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <h2 className="text-lg font-semibold">Revenue</h2>
                    <p className="text-2xl font-bold text-purple-600">$12,345</p>
                </div>
            </section>

            <section className="p-4">
                <div className="bg-white p-4 shadow rounded h-80">
                    <h2 className="text-lg font-semibold mb-4">User Growth</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={userGrowthData}>
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </>
    );
}

function Users({ search }) {
    const filtered = usersData.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );

     return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-semibold mb-2">Users</h2>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    u.status === "active" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {u.status}
                </span>
              </td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleBan(u.id)}
                  className={`px-3 py-1 rounded text-white ${
                    u.status === "banned" ? "bg-blue-500" : "bg-yellow-500"
                  }`}
                >
                  {u.status === "banned" ? "Unban" : "Ban"}
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="4" className="p-2 text-center text-gray-500">
                No matching users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );}

function Templates({ search }) {
    const [templates, setTemplates] = useState([
        { id: 1, name: "Modern Poster", category: "Marketing", url: "" },
        { id: 2, name: "Wedding Invite", category: "Event", url: "" },
        { id: 3, name: "Instagram Story", category: "Social Media", url: "" },
    ]);
    const [newTemplate, setNewTemplate] = useState({ name: "", category: "", url: "" });
    const [editTemplate, setEditTemplate] = useState(null);

    const filtered = templates.filter(
        (t) =>
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.category.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddTemplate = (e) => {
        e.preventDefault();
        if (!newTemplate.name || !newTemplate.category) return;
        setTemplates([...templates, { id: Date.now(), ...newTemplate }]);
        setNewTemplate({ name: "", category: "", url: "" });
    };

    const handleDelete = (id) => {
        setTemplates(templates.filter((t) => t.id !== id));
    };

    const handleEditSave = () => {
        setTemplates(
            templates.map((t) => (t.id === editTemplate.id ? editTemplate : t))
        );
        setEditTemplate(null);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewTemplate({
                ...newTemplate,
                name: file.name.replace(/\.[^/.]+$/, ""), // remove extension
                url: URL.createObjectURL(file),
            });
        }
    };

    const handleDriveUpload = () => {
        alert("Google Drive upload requires OAuth integration — placeholder here!");
    };

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-lg font-semibold mb-2">Templates</h2>

            {/* Add Template Form */}
            <form onSubmit={handleAddTemplate} className="space-y-2">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Template Name"
                        value={newTemplate.name}
                        onChange={(e) =>
                            setNewTemplate({ ...newTemplate, name: e.target.value })
                        }
                        className="border px-3 py-2 rounded flex-1"
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={newTemplate.category}
                        onChange={(e) =>
                            setNewTemplate({ ...newTemplate, category: e.target.value })
                        }
                        className="border px-3 py-2 rounded flex-1"
                    />
                </div>

                {/* File Upload */}
                <div className="flex gap-2">
                    <input
                        type="file"
                        onChange={handleFileUpload}
                        className="border px-3 py-2 rounded flex-1"
                    />
                    <button
                        type="button"
                        onClick={handleDriveUpload}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Upload from Drive
                    </button>
                </div>

                <button className="bg-green-600 text-white px-4 py-2 rounded">
                    Add Template
                </button>
            </form>

            {/* Templates Table */}
            <table className="w-full bg-white shadow rounded">
                <thead>
                    <tr className="border-b">
                        <th className="p-2 text-left">Preview</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Category</th>
                        <th className="p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((t) => (
                        <tr key={t.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">
                                {t.url && (
                                    <img src={t.url} alt={t.name} className="w-12 h-12 object-cover" />
                                )}
                            </td>
                            <td className="p-2">
                                {editTemplate?.id === t.id ? (
                                    <input
                                        value={editTemplate.name}
                                        onChange={(e) =>
                                            setEditTemplate({ ...editTemplate, name: e.target.value })
                                        }
                                        className="border px-2 py-1 rounded w-full"
                                    />
                                ) : (
                                    t.name
                                )}
                            </td>
                            <td className="p-2">
                                {editTemplate?.id === t.id ? (
                                    <input
                                        value={editTemplate.category}
                                        onChange={(e) =>
                                            setEditTemplate({ ...editTemplate, category: e.target.value })
                                        }
                                        className="border px-2 py-1 rounded w-full"
                                    />
                                ) : (
                                    t.category
                                )}
                            </td>
                            <td className="p-2 space-x-2">
                                {editTemplate?.id === t.id ? (
                                    <>
                                        <button
                                            onClick={handleEditSave}
                                            className="bg-blue-600 text-white px-3 py-1 rounded"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditTemplate(null)}
                                            className="bg-gray-400 text-white px-3 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setEditTemplate(t)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(t.id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan="4" className="p-2 text-center text-gray-500">
                                No matching templates found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}


function Assets({ search }) {
    const [assets, setAssets] = useState([
        { id: 1, name: "Logo.png", type: "Image", url: "" },
        { id: 2, name: "Intro.mp4", type: "Video", url: "" },
        { id: 3, name: "Roboto.ttf", type: "Font", url: "" },
    ]);
    const [newAsset, setNewAsset] = useState({ name: "", type: "", url: "" });
    const [editAsset, setEditAsset] = useState(null);

    const filtered = assets.filter(
        (a) =>
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.type.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddAsset = (e) => {
        e.preventDefault();
        if (!newAsset.name || !newAsset.type) return;
        setAssets([
            ...assets,
            { id: Date.now(), ...newAsset },
        ]);
        setNewAsset({ name: "", type: "", url: "" });
    };

    const handleDelete = (id) => {
        setAssets(assets.filter((a) => a.id !== id));
    };

    const handleEditSave = () => {
        setAssets(
            assets.map((a) => (a.id === editAsset.id ? editAsset : a))
        );
        setEditAsset(null);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewAsset({
                ...newAsset,
                name: file.name,
                type: file.type.split("/")[0], // e.g., image, video
                url: URL.createObjectURL(file), // Temporary local preview
            });
        }
    };

    const handleDriveUpload = () => {
        alert("Google Drive upload requires OAuth integration — placeholder here!");
    };

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-lg font-semibold mb-2">Assets Storage</h2>

            {/* Add Asset Form */}
            <form onSubmit={handleAddAsset} className="space-y-2">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Asset Name"
                        value={newAsset.name}
                        onChange={(e) =>
                            setNewAsset({ ...newAsset, name: e.target.value })
                        }
                        className="border px-3 py-2 rounded flex-1"
                    />
                    <input
                        type="text"
                        placeholder="Type (Image, Video, Font)"
                        value={newAsset.type}
                        onChange={(e) =>
                            setNewAsset({ ...newAsset, type: e.target.value })
                        }
                        className="border px-3 py-2 rounded flex-1"
                    />
                </div>

                {/* File Upload */}
                <div className="flex gap-2">
                    <input
                        type="file"
                        onChange={handleFileUpload}
                        className="border px-3 py-2 rounded flex-1"
                    />
                    <button
                        type="button"
                        onClick={handleDriveUpload}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Upload from Drive
                    </button>
                </div>

                <button className="bg-green-600 text-white px-4 py-2 rounded">
                    Add Asset
                </button>
            </form>

            {/* Assets Table */}
            <table className="w-full bg-white shadow rounded">
                <thead>
                    <tr className="border-b">
                        <th className="p-2 text-left">Preview</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Type</th>
                        <th className="p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((a) => (
                        <tr key={a.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">
                                {a.type.toLowerCase() === "image" && a.url && (
                                    <img src={a.url} alt={a.name} className="w-12 h-12 object-cover" />
                                )}
                                {a.type.toLowerCase() === "video" && a.url && (
                                    <video src={a.url} className="w-12 h-12" />
                                )}
                            </td>
                            <td className="p-2">
                                {editAsset?.id === a.id ? (
                                    <input
                                        value={editAsset.name}
                                        onChange={(e) =>
                                            setEditAsset({ ...editAsset, name: e.target.value })
                                        }
                                        className="border px-2 py-1 rounded w-full"
                                    />
                                ) : (
                                    a.name
                                )}
                            </td>
                            <td className="p-2">
                                {editAsset?.id === a.id ? (
                                    <input
                                        value={editAsset.type}
                                        onChange={(e) =>
                                            setEditAsset({ ...editAsset, type: e.target.value })
                                        }
                                        className="border px-2 py-1 rounded w-full"
                                    />
                                ) : (
                                    a.type
                                )}
                            </td>
                            <td className="p-2 space-x-2">
                                {editAsset?.id === a.id ? (
                                    <>
                                        <button
                                            onClick={handleEditSave}
                                            className="bg-blue-600 text-white px-3 py-1 rounded"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditAsset(null)}
                                            className="bg-gray-400 text-white px-3 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setEditAsset(a)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(a.id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan="4" className="p-2 text-center text-gray-500">
                                No matching assets found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}


function Analytics() {
    return (
        <div className="p-4 space-y-6">
            <div className="bg-white p-4 shadow rounded h-80">
                <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 shadow rounded h-80">
                <h2 className="text-lg font-semibold mb-4">Most Popular Templates</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={popularTemplatesData}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="usage" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

function Settings() {
    return (
        <div className="p-4 space-y-6">
            <div className="bg-white p-4 shadow rounded">
                <h2 className="text-lg font-semibold mb-4">Admin Profile</h2>
                <form className="space-y-4">
                    <input type="text" placeholder="Name" className="w-full border px-3 py-2 rounded" />
                    <input type="email" placeholder="Email" className="w-full border px-3 py-2 rounded" />
                    <input type="password" placeholder="Change Password" className="w-full border px-3 py-2 rounded" />
                    <button className="px-4 py-2 bg-purple-600 text-white rounded">Save</button>
                </form>
            </div>

            <div className="bg-white p-4 shadow rounded">
                <h2 className="text-lg font-semibold mb-4">Preferences</h2>
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="darkMode" />
                    <label htmlFor="darkMode">Enable Dark Mode</label>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" id="notifications" />
                    <label htmlFor="notifications">Enable Notifications</label>
                </div>
            </div>
        </div>
    );
}

export default function MattyAdmin() {
    const [activeSection, setActiveSection] = useState("Dashboard");
    const [searchTerm, setSearchTerm] = useState("");

    const renderSection = () => {
        switch (activeSection) {
            case "Dashboard": return <Dashboard />;
            case "Users": return <Users search={searchTerm} />;
            case "Templates": return <Templates search={searchTerm} />;
            case "Assets": return <Assets search={searchTerm} />;
            case "Analytics": return <Analytics />;
            case "Settings": return <Settings />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-4 text-2xl font-bold text-purple-600">Matty.ai Admin</div>
                <nav className="mt-6">
                    {["Dashboard", "Users", "Templates", "Assets", "Analytics", "Settings"].map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setActiveSection(item);
                                setSearchTerm("");
                            }}
                            className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${activeSection === item ? "bg-gray-200 font-semibold" : ""
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="flex justify-between items-center p-4 bg-white shadow">
                    <h1 className="text-xl font-semibold">{activeSection}</h1>
                    {["Users", "Templates", "Assets"].includes(activeSection) && (
                        <input
                            type="text"
                            placeholder={`Search ${activeSection}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-1 border rounded"
                        />
                    )}
                    {activeSection === "Dashboard" && (
                        <input
                            type="text"
                            placeholder="Quick search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-1 border rounded"
                        />
                    )}
                </header>

                {renderSection()}
            </main>
        </div>
    );
}