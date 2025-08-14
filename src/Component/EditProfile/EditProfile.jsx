import React, { useEffect, useRef, useState } from "react";
import { Camera, ImagePlus, Loader2, Save, Undo2, Upload, X } from "lucide-react";

export default function EditProfile({ initialUser, onSave, onCancel }) {
  const [username, setUsername] = useState(initialUser?.username ?? "");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initialUser?.avatarUrl ?? "");
  const [dragActive, setDragActive] = useState(false);
  const [saving, setSaving] = useState(false);
  const [touched, setTouched] = useState({ username: false });

  const inputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onFileSelected = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    onFileSelected(f);
  };

  const openPicker = () => inputRef.current?.click();

  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_\.]{2,19}$/;
  const isUsernameValid = usernameRegex.test(username || "");
  const usernameError =
    touched.username && !isUsernameValid
      ? "3–20 chars. Start with a letter. Letters, numbers, _ and . allowed."
      : "";

  const handleSave = async () => {
    setTouched((t) => ({ ...t, username: true }));
    if (!isUsernameValid) return;
    try {
      setSaving(true);
      await onSave?.({ username: username.trim(), avatarFile: file, previewUrl: preview });
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview("");
  };

  return (
    <div className="min-h-[70vh] w-full grid place-items-center p-4 bg-white text-zinc-900">
      <div className="w-full max-w-xl border border-zinc-300 bg-white rounded-2xl shadow-2xl p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
        </div>

        <div className="flex items-start gap-5">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden border border-zinc-300 shadow-lg">
              {preview ? (
                <img src={preview} alt="Profile" className="object-cover w-full h-full grayscale hover:grayscale-0 transition duration-300" />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-zinc-100 text-zinc-400">
                  <Camera className="h-6 w-6" />
                </div>
              )}
            </div>
            {preview && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -right-2 -top-2 h-8 w-8 rounded-full border border-zinc-300 bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex-1">
            <label htmlFor="avatar" className="text-zinc-700">Profile picture</label>
            <div
              onDragEnter={() => setDragActive(true)}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`mt-2 flex items-center justify-between gap-3 rounded-2xl border bg-zinc-50 p-3 transition ${dragActive ? "border-zinc-400" : "border-zinc-300 hover:border-zinc-400"}`}
            >
              <div className="flex items-center gap-3 text-zinc-700">
                <div className="grid h-9 w-9 place-items-center rounded-xl border border-zinc-300 bg-zinc-100">
                  <ImagePlus className="h-4 w-4" />
                </div>
                <div className="leading-tight">
                  <p className="text-sm">Drag & drop an image here</p>
                  <p className="text-xs text-zinc-500">PNG, JPG up to ~5MB</p>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onFileSelected(e.target.files?.[0] ?? null)}
                />
                <button
                  type="button"
                  onClick={openPicker}
                  className="px-3 py-1.5 rounded-lg border border-zinc-300 bg-zinc-100 text-zinc-700 hover:bg-zinc-200 text-sm flex items-center"
                >
                  <Upload className="mr-2 h-4 w-4" /> Choose
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="username" className="text-zinc-700">Username</label>
          <div className="relative">
            <input
              id="username"
              placeholder="your_handle"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, username: true }))}
              className={`peer h-11 w-full px-3 rounded-2xl bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 border ${touched.username && !isUsernameValid ? "border-red-600" : "border-zinc-300 focus:border-zinc-400"}`}
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
              {username.length}/20
            </span>
          </div>
          {usernameError && <p className="text-xs text-red-500">{usernameError}</p>}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-zinc-600 hover:text-zinc-800 hover:bg-zinc-100 flex items-center text-sm"
          >
            <Undo2 className="mr-2 h-4 w-4" /> Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-2xl bg-zinc-900 text-white hover:bg-black shadow-md flex items-center text-sm"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
