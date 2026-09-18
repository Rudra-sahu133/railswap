function Button({ children, type = "button" }) {
  return (
    <button
      type={type}
      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
}

export default Button;
