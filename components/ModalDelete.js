export const ModalDeleteConfirmation = ({ isOpen, onClose, onDelete, role }) => {
  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="w-[400px] bg-white rounded-lg p-6 flex flex-col gap-4">
        <p className="font-semibold text-lg text-[#424242]">Hapus {role}</p>
        <p className="text-sm text-[#424242]">
          Apakah Anda yakin ingin menghapus {role.toLowerCase()} ini? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="w-full flex gap-4">
          <button
            className="w-full py-2 rounded-lg border border-[#29ADB2] text-[#29ADB2] font-semibold"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            className="w-full py-2 rounded-lg bg-[#29ADB2] text-white font-semibold"
            onClick={onDelete}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};
