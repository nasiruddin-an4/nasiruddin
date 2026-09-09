"use client";

import { useState, useEffect } from "react";
import { getSettings, updateSettings } from "../actions";
import CloudinaryUpload from "../components/CloudinaryUpload";
import { Plus, Trash2, Save } from "lucide-react";

const ICON_OPTIONS = [
  { value: "FaLinkedinIn", label: "LinkedIn" },
  { value: "FaFacebookF", label: "Facebook" },
  { value: "FaInstagram", label: "Instagram" },
  { value: "FaXTwitter", label: "X (Twitter)" },
  { value: "FaBehance", label: "Behance" },
];

export default function AdminSettings() {
  const [logoUrl, setLogoUrl] = useState("");
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    (async () => {
      const settings = await getSettings();
      setLogoUrl(settings?.logoUrl || "");
      setSocials(
        (settings?.socials || []).map((s) => ({ name: s.name || "", url: s.url || "", icon: s.icon || ICON_OPTIONS[0].value }))
      );
      setLoading(false);
    })();
  }, []);

  const addSocial = () => {
    setSocials((prev) => [...prev, { name: "", url: "", icon: ICON_OPTIONS[0].value }]);
  };

  const updateSocial = (index, field, value) => {
    setSocials((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const removeSocial = (index) => {
    setSocials((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const validSocials = socials.filter((s) => s.name.trim() && s.url.trim());
    await updateSettings({ logoUrl, socials: validSocials });
    setSocials(validSocials);
    setSaving(false);
    setSavedAt(Date.now());
    setTimeout(() => setSavedAt(null), 3000);
  };

  if (loading) {
    return <div className="text-zinc-400 font-sans">Loading settings...</div>;
  }

  return (
    <div className="max-w-3xl space-y-6 text-white font-sans pb-20">
      <div className="flex justify-between items-center bg-[#1a1a1a] p-6 rounded-xl border border-zinc-800">
        <h1 className="text-2xl font-oswald uppercase tracking-widest text-brandYellow">Settings</h1>
        {savedAt && <span className="text-sm text-emerald-400">Saved!</span>}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <section className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-8 space-y-4">
          <h2 className="text-xl font-oswald uppercase tracking-widest text-white border-b border-zinc-800 pb-2">Site Logo</h2>
          <p className="text-xs text-zinc-500">Used in the mobile navbar and in emails sent from the contact form. Leave empty to use the default logo.</p>
          <CloudinaryUpload defaultImage={logoUrl} onUploadSuccess={setLogoUrl} />
        </section>

        <section className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-oswald uppercase tracking-widest text-white">Social Links</h2>
            <button
              type="button"
              onClick={addSocial}
              className="text-sm bg-brandYellow text-brandBlack px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 hover:bg-white transition-colors"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          {socials.length === 0 && (
            <p className="text-sm text-zinc-500 italic">No social links yet. Click &quot;Add&quot; to create one.</p>
          )}

          <div className="space-y-4">
            {socials.map((s, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto_auto] gap-3 items-center bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                <select
                  value={s.icon}
                  onChange={(e) => updateSocial(i, "icon", e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 text-white px-3 py-2 rounded-lg text-sm focus:border-brandYellow outline-none"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={s.url}
                  onChange={(e) => updateSocial(i, "url", e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 text-white px-3 py-2 rounded-lg text-sm focus:border-brandYellow outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Display name"
                  value={s.name}
                  onChange={(e) => updateSocial(i, "name", e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 text-white px-3 py-2 rounded-lg text-sm focus:border-brandYellow outline-none w-full md:w-32"
                />
                <button
                  type="button"
                  onClick={() => removeSocial(i)}
                  className="text-red-500 hover:text-red-400 transition-colors bg-red-500/10 p-2 rounded-lg justify-self-end"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-brandYellow text-brandBlack font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-white transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-5 h-5" /> {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
