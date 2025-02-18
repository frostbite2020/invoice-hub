const NotificationIcon = ({ color = "currentColor" }: { color?: string }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.2 14.9344L15.6375 14.0625C15.525 13.8937 15.4688 13.725 15.4688 13.5281V7.67812C15.4688 6.01875 14.7657 4.47187 13.4719 3.31875C12.4313 2.39062 11.0813 1.8 9.6469 1.6875V1.125C9.6469 0.7875 9.36565 0.478125 9.00002 0.478125C8.66252 0.478125 8.35315 0.759375 8.35315 1.125V1.65937C8.2969 1.65937 8.24065 1.65937 8.1844 1.6875C4.9219 2.05312 2.47502 4.66875 2.47502 7.79062V13.5281C2.4469 13.8094 2.39065 13.95 2.3344 14.0344L1.80002 14.9344C1.63127 15.2156 1.63127 15.5531 1.80002 15.8344C1.96877 16.0875 2.25002 16.2562 2.5594 16.2562H8.38127V16.875C8.38127 17.2125 8.66252 17.5219 9.02815 17.5219C9.36565 17.5219 9.67503 17.2406 9.67503 16.875V16.2562H15.4688C15.7782 16.2562 16.0594 16.0875 16.2282 15.8344C16.3969 15.5531 16.3969 15.2156 16.2 14.9344ZM3.2344 14.9906L3.43127 14.6531C3.60002 14.3719 3.6844 14.0344 3.74065 13.6406V7.79062C3.74065 5.31562 5.7094 3.23437 8.32503 2.95312C9.92815 2.78437 11.5031 3.2625 12.6563 4.275C13.6688 5.175 14.2313 6.38437 14.2313 7.67812V13.5281C14.2313 13.95 14.3438 14.3438 14.5969 14.7375L14.7657 14.9906H3.2344Z"
        fill="#64748B"
      />
    </svg>
  );
};

export default NotificationIcon;
