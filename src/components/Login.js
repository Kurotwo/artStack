import React, { useRef, useState, useEffect, useContext } from "react";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import anime from "animejs";
import image from "../ArtStack.svg";
import { signInWithGoogle } from "../services/firebase";
import { UserContext } from '../providers/UserProvider';
import { Redirect, useHistory } from 'react-router-dom';

const Login = () => {
  const user = useContext(UserContext)
  const [redirect, setredirect] = useState(null)
  // const history = useHistory();

  useEffect(() => {
    animate();
  }, []);

  useEffect(() => {
    if (user) {
      setredirect('/landing')
    }
  }, [user])

  if (redirect) {
    console.log("redirecting to", redirect);
    return <Redirect to={"/landing"}/>
    // history.push(redirect)
  }

  function animate() {
    const t1 = anime.timeline();

    t1.add({
      targets: ".title path",
      fill: "black",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 500,
      delay: (el, i) => {
        return i * 250;
      },
    })
      .add({
        targets: ".logo",
        opacity: 1,
        easing: "linear",
        duration: 500,
      })
      .add({
        targets: ".circle",
        opacity: 1,
        easing: "linear",
      })
      .add({
        targets: ".circle",
        translateX: function () {
          return anime.random(-500, 500);
        },
        translateY: function () {
          return anime.random(-250, 250);
        },
        scale: function () {
          return anime.random(1, 2);
        },
        easing: "linear",
        delay: anime.stagger(10),
        offset: "-=100",
      });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative" }}>
        <svg
          className="title"
          width="521"
          height="128"
          viewBox="0 0 521 128"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <mask
            id="path-1-outside-1"
            maskUnits="userSpaceOnUse"
            x="0.0319977"
            y="0.559998"
            width="521"
            height="127"
            fill="black"
          >
            <rect
              fill="white"
              x="0.0319977"
              y="0.559998"
              width="521"
              height="127"
            />
            <path d="M113.407 81.0201C114.258 81.7005 114.683 82.5935 114.683 83.6992C114.683 84.8049 114.3 85.7405 113.535 86.5059H95.4186L102.691 110.746C102.861 111.341 102.946 112.106 102.946 113.042C102.946 113.978 102.35 115.126 101.16 116.487C99.9689 117.847 98.7357 118.528 97.4599 118.528C95.0784 118.528 93.2073 117.932 91.8465 116.742L82.7885 86.5059H50.2563L43.8774 103.856C41.666 109.725 38.4766 114.786 34.3091 119.038C30.1416 123.291 24.7408 125.417 18.1067 125.417C13.0887 125.417 9.17633 124.099 6.36963 121.462C3.47787 118.826 2.032 114.998 2.032 109.98C2.032 104.962 3.26525 100.454 5.73174 96.457C8.11319 92.3745 11.3026 89.185 15.3 86.8886C23.2949 82.2959 32.2253 79.9995 42.0913 79.9995L60.7176 27.4376C61.5681 24.9711 62.4612 23.1425 63.3967 21.9518C60.7601 13.1064 59.4418 8.25845 59.4418 7.40794C59.4418 6.47237 60.0372 5.45175 61.2279 4.34608C62.5037 3.15536 63.7795 2.56 65.0552 2.56C67.5217 2.56 69.4354 3.15536 70.7962 4.34608L93.3774 79.9995L110.09 79.8719C111.536 79.8719 112.642 80.2546 113.407 81.0201ZM18.1067 120.059C24.4856 120.059 30.014 113.637 34.6918 100.795L39.6673 86.6335C30.3117 86.6335 22.8696 88.8448 17.3413 93.2675C11.898 97.6902 9.17633 103.516 9.17633 110.746C9.17633 113.722 9.98432 116.019 11.6003 117.635C13.3013 119.251 15.4701 120.059 18.1067 120.059ZM68.2447 31.7752L52.6802 79.9995H80.7472L68.2447 31.7752Z" />
            <path d="M132.559 87.399V107.684C131.708 108.874 130.22 109.47 128.093 109.47C125.967 109.47 124.266 108.832 122.99 107.556C121.715 106.195 121.077 104.239 121.077 101.688V53.2082C121.927 52.0175 123.416 51.4221 125.542 51.4221C127.668 51.4221 129.369 52.1026 130.645 53.4634C131.921 54.7391 132.559 56.6528 132.559 59.2044V68.9002C136.811 58.3538 142.68 53.0806 150.164 53.0806C155.523 53.0806 159.435 54.5265 161.901 57.4183C164.368 60.225 165.601 63.5845 165.601 67.4969C165.601 69.6232 164.963 71.3242 163.688 72.6C162.412 73.8758 161.178 74.5136 159.988 74.5136C157.776 74.5136 156.331 74.0033 155.65 72.9827C156.16 71.7069 156.416 69.8783 156.416 67.4969C156.416 65.1154 155.608 62.9466 153.992 60.9904C152.376 59.0343 150.419 58.0562 148.123 58.0562C144.126 58.0562 140.511 61.7134 137.279 69.0278C134.132 76.2572 132.559 82.3809 132.559 87.399Z" />
            <path d="M170.535 40.3229C170.535 37.7714 171.173 35.8577 172.448 34.5819C173.724 33.2211 175.34 32.5407 177.296 32.5407C179.253 32.5407 180.826 33.136 182.017 34.3268V53.2082H199.495C201.281 53.2082 202.429 53.5484 202.939 54.2288C203.535 54.9093 203.833 56.0575 203.833 57.6734H182.017V89.8229C182.017 94.5008 183.335 98.1155 185.972 100.667C188.693 103.219 191.798 104.494 195.285 104.494C200.558 104.494 204.428 102.538 206.894 98.6258C209.361 94.7134 210.594 88.3771 210.594 79.6167C210.764 79.1064 211.402 78.8513 212.508 78.8513C214.039 78.8513 214.804 81.1051 214.804 85.6129C214.804 92.5021 213.061 98.2005 209.573 102.708C206.171 107.216 200.898 109.47 193.754 109.47C186.61 109.47 180.954 107.599 176.786 103.856C172.619 100.114 170.535 94.5433 170.535 87.1438V40.3229Z" />
            <path d="M269.587 89.5678C269.587 85.4853 268.609 81.9982 266.652 79.1064C264.781 76.2147 262.315 73.9608 259.253 72.3448C256.276 70.7288 252.959 69.283 249.302 68.0072C245.645 66.7314 241.987 65.4557 238.33 64.1799C234.673 62.8191 231.313 61.2456 228.252 59.4595C225.275 57.5884 222.808 55.0368 220.852 51.8049C218.981 48.5729 218.045 44.6605 218.045 40.0678C218.045 32.158 220.937 25.9492 226.721 21.4414C232.589 16.9337 240.074 14.6799 249.174 14.6799C258.36 14.6799 265.674 16.7636 271.118 20.9311C276.561 25.0987 279.283 29.6489 279.283 34.5819C279.283 37.984 278.602 40.5355 277.241 42.2366C275.966 43.8525 274.435 44.6605 272.649 44.6605C269.332 44.6605 267.205 44.0226 266.27 42.7469L265.887 42.109C266.737 41.0033 267.163 38.877 267.163 35.7301C267.163 30.8822 265.121 27.0974 261.039 24.3757C256.957 21.569 252.194 20.1657 246.75 20.1657C241.392 20.1657 237.14 21.6116 233.993 24.5033C230.846 27.3951 229.272 30.9247 229.272 35.0922C229.272 39.2598 230.208 42.7469 232.079 45.5536C234.035 48.2752 236.544 50.4015 239.606 51.9324C242.668 53.4634 246.027 54.8242 249.685 56.0149C253.427 57.2056 257.127 58.5239 260.784 59.9698C264.526 61.3306 267.928 63.0317 270.99 65.0729C274.052 67.0291 276.518 69.8358 278.39 73.493C280.346 77.1502 281.324 81.5729 281.324 86.7611C281.324 95.8616 278.092 102.836 271.628 107.684C265.164 112.532 257.042 114.956 247.261 114.956C237.565 114.956 229.102 112.489 221.873 107.556C214.728 102.538 211.156 96.2868 211.156 88.8023C211.156 85.3152 211.837 82.5935 213.197 80.6374C214.558 78.5961 216.174 77.5755 218.045 77.5755C221.362 77.5755 223.489 78.1283 224.424 79.234L224.807 79.8719C224.042 81.9982 223.659 84.5923 223.659 87.6541C223.659 93.4376 225.998 98.4982 230.676 102.836C235.438 107.173 241.647 109.342 249.302 109.342C254.83 109.342 259.593 107.429 263.591 103.601C267.588 99.6889 269.587 95.0111 269.587 89.5678Z" />
            <path d="M286.526 40.3229C286.526 37.7714 287.163 35.8577 288.439 34.5819C289.715 33.2211 291.331 32.5407 293.287 32.5407C295.243 32.5407 296.817 33.136 298.008 34.3268V53.2082H315.486C317.272 53.2082 318.42 53.5484 318.93 54.2288C319.526 54.9093 319.823 56.0575 319.823 57.6734H298.008V89.8229C298.008 94.5008 299.326 98.1155 301.962 100.667C304.684 103.219 307.788 104.494 311.276 104.494C316.549 104.494 320.419 102.538 322.885 98.6258C325.352 94.7134 326.585 88.3771 326.585 79.6167C326.755 79.1064 327.393 78.8513 328.499 78.8513C330.029 78.8513 330.795 81.1051 330.795 85.6129C330.795 92.5021 329.051 98.2005 325.564 102.708C322.162 107.216 316.889 109.47 309.745 109.47C302.6 109.47 296.944 107.599 292.777 103.856C288.609 100.114 286.526 94.5433 286.526 87.1438V40.3229Z" />
            <path d="M364.782 55.1219C365.888 52.6554 367.632 51.4221 370.013 51.4221C372.48 51.4221 374.308 52.0175 375.499 53.2082V89.8229C375.499 94.6709 376.264 98.3281 377.795 100.795C379.326 103.261 381.41 104.494 384.047 104.494C392.041 104.494 396.039 96.2018 396.039 79.6167C396.124 79.1064 396.762 78.8513 397.952 78.8513C399.483 78.8513 400.249 81.1051 400.249 85.6129C400.249 92.8423 398.675 98.6258 395.529 102.963C392.467 107.301 388.129 109.47 382.516 109.47C373.925 109.47 368.227 105.685 365.42 98.1155C363.804 101.603 361.593 104.367 358.786 106.408C355.98 108.449 352.79 109.47 349.218 109.47C334.334 109.47 326.892 99.7314 326.892 80.2546C326.892 70.3886 329.188 63.1167 333.781 58.4389C338.459 53.7611 344.625 51.4221 352.28 51.4221C358.148 51.4221 362.316 52.6554 364.782 55.1219ZM340.798 95.9466C341.989 99.6889 343.349 102.07 344.88 103.091C346.411 104.027 348.452 104.494 351.004 104.494C353.556 104.494 356.32 102.921 359.297 99.774C362.358 96.542 363.889 92.3745 363.889 87.2714V69.7933C363.889 65.7959 362.826 62.5639 360.7 60.0974C358.659 57.6309 356.32 56.3977 353.683 56.3977C351.132 56.3977 349.09 56.6528 347.559 57.1631C346.028 57.6734 344.583 58.7366 343.222 60.3526C340.415 63.4144 339.012 70.0484 339.012 80.2546C339.012 86.9737 339.607 92.2044 340.798 95.9466Z" />
            <path d="M449.742 82.9337C451.528 82.9337 452.421 84.167 452.421 86.6335C452.421 89.1 451.911 91.5665 450.89 94.033C449.869 96.4995 448.381 98.9234 446.425 101.305C444.554 103.686 441.875 105.643 438.388 107.173C434.985 108.704 431.116 109.47 426.778 109.47C417.252 109.47 409.768 107.088 404.324 102.326C398.966 97.4776 396.287 90.4183 396.287 81.1477C396.287 71.792 398.668 64.5201 403.431 59.3319C408.194 54.0587 414.275 51.4221 421.675 51.4221C427.033 51.4221 430.945 52.868 433.412 55.7598C435.878 58.5665 437.112 61.926 437.112 65.8384C437.112 67.9647 436.474 69.6657 435.198 70.9415C433.922 72.2172 432.689 72.8551 431.498 72.8551C429.287 72.8551 427.841 72.3448 427.161 71.3242C427.671 70.0484 427.926 68.2198 427.926 65.8384C427.926 63.4569 427.118 61.2881 425.502 59.3319C423.886 57.3758 421.93 56.3977 419.634 56.3977C415.636 56.3977 412.744 58.3538 410.958 62.2662C409.257 66.1786 408.407 72.3448 408.407 80.7649C408.407 89.1 410.023 95.1386 413.255 98.8809C416.572 102.623 421.165 104.494 427.033 104.494C432.902 104.494 437.835 102.708 441.832 99.1361C445.83 95.4789 447.828 90.3332 447.828 83.6992C447.913 83.1889 448.551 82.9337 449.742 82.9337Z" />
            <path d="M516.117 78.8513C517.648 78.8513 518.413 81.1051 518.413 85.6129C518.413 92.6722 516.797 98.4131 513.565 102.836C510.333 107.259 505.868 109.47 500.17 109.47C494.471 109.47 489.623 107.599 485.626 103.856C481.629 100.029 479.12 95.4363 478.099 90.0781C472.401 92.4595 466.234 93.8204 459.6 94.1606V107.684C458.75 108.874 457.261 109.47 455.135 109.47C453.009 109.47 451.308 108.832 450.032 107.556C448.756 106.195 448.118 104.239 448.118 101.688V37.7714C448.118 26.7147 449.181 18.7198 451.308 13.7868C453.434 8.76876 457.516 6.25974 463.555 6.25974C466.787 6.25974 469.296 7.62057 471.082 10.3422C472.868 13.0639 473.761 16.9337 473.761 21.9518C473.761 31.0523 469.041 40.3229 459.6 49.7636V62.0111C463.428 54.9518 469.551 51.4221 477.971 51.4221C483.33 51.4221 487.625 52.8255 490.857 55.6322C494.174 58.4389 495.832 62.2662 495.832 67.1142C495.832 73.6631 493.026 79.4041 487.412 84.3371C487.837 89.5252 489.411 94.2031 492.132 98.3706C494.854 102.453 498.299 104.494 502.466 104.494C505.698 104.494 508.462 102.496 510.759 98.4982C513.055 94.4157 514.203 88.1219 514.203 79.6167C514.288 79.1064 514.926 78.8513 516.117 78.8513ZM484.605 67.2417C484.605 63.6696 483.84 60.9054 482.309 58.9492C480.778 56.908 478.822 55.8873 476.44 55.8873C471.763 55.8873 467.765 58.3964 464.448 63.4144C461.216 68.4324 459.6 77.0227 459.6 89.185C466.915 88.4196 472.911 85.9106 477.589 81.658C482.267 77.3203 484.605 72.5149 484.605 67.2417ZM459.6 43.6399C465.384 36.1554 468.276 28.8835 468.276 21.8242C468.276 14.7649 466.745 11.2353 463.683 11.2353C461.982 11.2353 460.876 13.1914 460.366 17.1038C459.855 21.0162 459.6 29.8616 459.6 43.6399Z" />
          </mask>
          <path
            d="M113.407 81.0201C114.258 81.7005 114.683 82.5935 114.683 83.6992C114.683 84.8049 114.3 85.7405 113.535 86.5059H95.4186L102.691 110.746C102.861 111.341 102.946 112.106 102.946 113.042C102.946 113.978 102.35 115.126 101.16 116.487C99.9689 117.847 98.7357 118.528 97.4599 118.528C95.0784 118.528 93.2073 117.932 91.8465 116.742L82.7885 86.5059H50.2563L43.8774 103.856C41.666 109.725 38.4766 114.786 34.3091 119.038C30.1416 123.291 24.7408 125.417 18.1067 125.417C13.0887 125.417 9.17633 124.099 6.36963 121.462C3.47787 118.826 2.032 114.998 2.032 109.98C2.032 104.962 3.26525 100.454 5.73174 96.457C8.11319 92.3745 11.3026 89.185 15.3 86.8886C23.2949 82.2959 32.2253 79.9995 42.0913 79.9995L60.7176 27.4376C61.5681 24.9711 62.4612 23.1425 63.3967 21.9518C60.7601 13.1064 59.4418 8.25845 59.4418 7.40794C59.4418 6.47237 60.0372 5.45175 61.2279 4.34608C62.5037 3.15536 63.7795 2.56 65.0552 2.56C67.5217 2.56 69.4354 3.15536 70.7962 4.34608L93.3774 79.9995L110.09 79.8719C111.536 79.8719 112.642 80.2546 113.407 81.0201ZM18.1067 120.059C24.4856 120.059 30.014 113.637 34.6918 100.795L39.6673 86.6335C30.3117 86.6335 22.8696 88.8448 17.3413 93.2675C11.898 97.6902 9.17633 103.516 9.17633 110.746C9.17633 113.722 9.98432 116.019 11.6003 117.635C13.3013 119.251 15.4701 120.059 18.1067 120.059ZM68.2447 31.7752L52.6802 79.9995H80.7472L68.2447 31.7752Z"
            stroke="black"
            stroke-width="4"
            mask="url(#path-1-outside-1)"
          />
          <path
            d="M132.559 87.399V107.684C131.708 108.874 130.22 109.47 128.093 109.47C125.967 109.47 124.266 108.832 122.99 107.556C121.715 106.195 121.077 104.239 121.077 101.688V53.2082C121.927 52.0175 123.416 51.4221 125.542 51.4221C127.668 51.4221 129.369 52.1026 130.645 53.4634C131.921 54.7391 132.559 56.6528 132.559 59.2044V68.9002C136.811 58.3538 142.68 53.0806 150.164 53.0806C155.523 53.0806 159.435 54.5265 161.901 57.4183C164.368 60.225 165.601 63.5845 165.601 67.4969C165.601 69.6232 164.963 71.3242 163.688 72.6C162.412 73.8758 161.178 74.5136 159.988 74.5136C157.776 74.5136 156.331 74.0033 155.65 72.9827C156.16 71.7069 156.416 69.8783 156.416 67.4969C156.416 65.1154 155.608 62.9466 153.992 60.9904C152.376 59.0343 150.419 58.0562 148.123 58.0562C144.126 58.0562 140.511 61.7134 137.279 69.0278C134.132 76.2572 132.559 82.3809 132.559 87.399Z"
            stroke="black"
            stroke-width="4"
            mask="url(#path-1-outside-1)"
          />
          <path
            d="M170.535 40.3229C170.535 37.7714 171.173 35.8577 172.448 34.5819C173.724 33.2211 175.34 32.5407 177.296 32.5407C179.253 32.5407 180.826 33.136 182.017 34.3268V53.2082H199.495C201.281 53.2082 202.429 53.5484 202.939 54.2288C203.535 54.9093 203.833 56.0575 203.833 57.6734H182.017V89.8229C182.017 94.5008 183.335 98.1155 185.972 100.667C188.693 103.219 191.798 104.494 195.285 104.494C200.558 104.494 204.428 102.538 206.894 98.6258C209.361 94.7134 210.594 88.3771 210.594 79.6167C210.764 79.1064 211.402 78.8513 212.508 78.8513C214.039 78.8513 214.804 81.1051 214.804 85.6129C214.804 92.5021 213.061 98.2005 209.573 102.708C206.171 107.216 200.898 109.47 193.754 109.47C186.61 109.47 180.954 107.599 176.786 103.856C172.619 100.114 170.535 94.5433 170.535 87.1438V40.3229Z"
            stroke="black"
            stroke-width="4"
            mask="url(#path-1-outside-1)"
          />
          <path
            d="M269.587 89.5678C269.587 85.4853 268.609 81.9982 266.652 79.1064C264.781 76.2147 262.315 73.9608 259.253 72.3448C256.276 70.7288 252.959 69.283 249.302 68.0072C245.645 66.7314 241.987 65.4557 238.33 64.1799C234.673 62.8191 231.313 61.2456 228.252 59.4595C225.275 57.5884 222.808 55.0368 220.852 51.8049C218.981 48.5729 218.045 44.6605 218.045 40.0678C218.045 32.158 220.937 25.9492 226.721 21.4414C232.589 16.9337 240.074 14.6799 249.174 14.6799C258.36 14.6799 265.674 16.7636 271.118 20.9311C276.561 25.0987 279.283 29.6489 279.283 34.5819C279.283 37.984 278.602 40.5355 277.241 42.2366C275.966 43.8525 274.435 44.6605 272.649 44.6605C269.332 44.6605 267.205 44.0226 266.27 42.7469L265.887 42.109C266.737 41.0033 267.163 38.877 267.163 35.7301C267.163 30.8822 265.121 27.0974 261.039 24.3757C256.957 21.569 252.194 20.1657 246.75 20.1657C241.392 20.1657 237.14 21.6116 233.993 24.5033C230.846 27.3951 229.272 30.9247 229.272 35.0922C229.272 39.2598 230.208 42.7469 232.079 45.5536C234.035 48.2752 236.544 50.4015 239.606 51.9324C242.668 53.4634 246.027 54.8242 249.685 56.0149C253.427 57.2056 257.127 58.5239 260.784 59.9698C264.526 61.3306 267.928 63.0317 270.99 65.0729C274.052 67.0291 276.518 69.8358 278.39 73.493C280.346 77.1502 281.324 81.5729 281.324 86.7611C281.324 95.8616 278.092 102.836 271.628 107.684C265.164 112.532 257.042 114.956 247.261 114.956C237.565 114.956 229.102 112.489 221.873 107.556C214.728 102.538 211.156 96.2868 211.156 88.8023C211.156 85.3152 211.837 82.5935 213.197 80.6374C214.558 78.5961 216.174 77.5755 218.045 77.5755C221.362 77.5755 223.489 78.1283 224.424 79.234L224.807 79.8719C224.042 81.9982 223.659 84.5923 223.659 87.6541C223.659 93.4376 225.998 98.4982 230.676 102.836C235.438 107.173 241.647 109.342 249.302 109.342C254.83 109.342 259.593 107.429 263.591 103.601C267.588 99.6889 269.587 95.0111 269.587 89.5678Z"
            stroke="black"
            stroke-width="4"
            mask="url(#path-1-outside-1)"
          />
          <path
            d="M286.526 40.3229C286.526 37.7714 287.163 35.8577 288.439 34.5819C289.715 33.2211 291.331 32.5407 293.287 32.5407C295.243 32.5407 296.817 33.136 298.008 34.3268V53.2082H315.486C317.272 53.2082 318.42 53.5484 318.93 54.2288C319.526 54.9093 319.823 56.0575 319.823 57.6734H298.008V89.8229C298.008 94.5008 299.326 98.1155 301.962 100.667C304.684 103.219 307.788 104.494 311.276 104.494C316.549 104.494 320.419 102.538 322.885 98.6258C325.352 94.7134 326.585 88.3771 326.585 79.6167C326.755 79.1064 327.393 78.8513 328.499 78.8513C330.029 78.8513 330.795 81.1051 330.795 85.6129C330.795 92.5021 329.051 98.2005 325.564 102.708C322.162 107.216 316.889 109.47 309.745 109.47C302.6 109.47 296.944 107.599 292.777 103.856C288.609 100.114 286.526 94.5433 286.526 87.1438V40.3229Z"
            stroke="black"
            stroke-width="4"
            mask="url(#path-1-outside-1)"
          />
          <path
            d="M364.782 55.1219C365.888 52.6554 367.632 51.4221 370.013 51.4221C372.48 51.4221 374.308 52.0175 375.499 53.2082V89.8229C375.499 94.6709 376.264 98.3281 377.795 100.795C379.326 103.261 381.41 104.494 384.047 104.494C392.041 104.494 396.039 96.2018 396.039 79.6167C396.124 79.1064 396.762 78.8513 397.952 78.8513C399.483 78.8513 400.249 81.1051 400.249 85.6129C400.249 92.8423 398.675 98.6258 395.529 102.963C392.467 107.301 388.129 109.47 382.516 109.47C373.925 109.47 368.227 105.685 365.42 98.1155C363.804 101.603 361.593 104.367 358.786 106.408C355.98 108.449 352.79 109.47 349.218 109.47C334.334 109.47 326.892 99.7314 326.892 80.2546C326.892 70.3886 329.188 63.1167 333.781 58.4389C338.459 53.7611 344.625 51.4221 352.28 51.4221C358.148 51.4221 362.316 52.6554 364.782 55.1219ZM340.798 95.9466C341.989 99.6889 343.349 102.07 344.88 103.091C346.411 104.027 348.452 104.494 351.004 104.494C353.556 104.494 356.32 102.921 359.297 99.774C362.358 96.542 363.889 92.3745 363.889 87.2714V69.7933C363.889 65.7959 362.826 62.5639 360.7 60.0974C358.659 57.6309 356.32 56.3977 353.683 56.3977C351.132 56.3977 349.09 56.6528 347.559 57.1631C346.028 57.6734 344.583 58.7366 343.222 60.3526C340.415 63.4144 339.012 70.0484 339.012 80.2546C339.012 86.9737 339.607 92.2044 340.798 95.9466Z"
            stroke="black"
            stroke-width="4"
            mask="url(#path-1-outside-1)"
          />
          <path
            d="M449.742 82.9337C451.528 82.9337 452.421 84.167 452.421 86.6335C452.421 89.1 451.911 91.5665 450.89 94.033C449.869 96.4995 448.381 98.9234 446.425 101.305C444.554 103.686 441.875 105.643 438.388 107.173C434.985 108.704 431.116 109.47 426.778 109.47C417.252 109.47 409.768 107.088 404.324 102.326C398.966 97.4776 396.287 90.4183 396.287 81.1477C396.287 71.792 398.668 64.5201 403.431 59.3319C408.194 54.0587 414.275 51.4221 421.675 51.4221C427.033 51.4221 430.945 52.868 433.412 55.7598C435.878 58.5665 437.112 61.926 437.112 65.8384C437.112 67.9647 436.474 69.6657 435.198 70.9415C433.922 72.2172 432.689 72.8551 431.498 72.8551C429.287 72.8551 427.841 72.3448 427.161 71.3242C427.671 70.0484 427.926 68.2198 427.926 65.8384C427.926 63.4569 427.118 61.2881 425.502 59.3319C423.886 57.3758 421.93 56.3977 419.634 56.3977C415.636 56.3977 412.744 58.3538 410.958 62.2662C409.257 66.1786 408.407 72.3448 408.407 80.7649C408.407 89.1 410.023 95.1386 413.255 98.8809C416.572 102.623 421.165 104.494 427.033 104.494C432.902 104.494 437.835 102.708 441.832 99.1361C445.83 95.4789 447.828 90.3332 447.828 83.6992C447.913 83.1889 448.551 82.9337 449.742 82.9337Z"
            stroke="black"
            stroke-width="4"
            mask="url(#path-1-outside-1)"
          />
          <path
            d="M516.117 78.8513C517.648 78.8513 518.413 81.1051 518.413 85.6129C518.413 92.6722 516.797 98.4131 513.565 102.836C510.333 107.259 505.868 109.47 500.17 109.47C494.471 109.47 489.623 107.599 485.626 103.856C481.629 100.029 479.12 95.4363 478.099 90.0781C472.401 92.4595 466.234 93.8204 459.6 94.1606V107.684C458.75 108.874 457.261 109.47 455.135 109.47C453.009 109.47 451.308 108.832 450.032 107.556C448.756 106.195 448.118 104.239 448.118 101.688V37.7714C448.118 26.7147 449.181 18.7198 451.308 13.7868C453.434 8.76876 457.516 6.25974 463.555 6.25974C466.787 6.25974 469.296 7.62057 471.082 10.3422C472.868 13.0639 473.761 16.9337 473.761 21.9518C473.761 31.0523 469.041 40.3229 459.6 49.7636V62.0111C463.428 54.9518 469.551 51.4221 477.971 51.4221C483.33 51.4221 487.625 52.8255 490.857 55.6322C494.174 58.4389 495.832 62.2662 495.832 67.1142C495.832 73.6631 493.026 79.4041 487.412 84.3371C487.837 89.5252 489.411 94.2031 492.132 98.3706C494.854 102.453 498.299 104.494 502.466 104.494C505.698 104.494 508.462 102.496 510.759 98.4982C513.055 94.4157 514.203 88.1219 514.203 79.6167C514.288 79.1064 514.926 78.8513 516.117 78.8513ZM484.605 67.2417C484.605 63.6696 483.84 60.9054 482.309 58.9492C480.778 56.908 478.822 55.8873 476.44 55.8873C471.763 55.8873 467.765 58.3964 464.448 63.4144C461.216 68.4324 459.6 77.0227 459.6 89.185C466.915 88.4196 472.911 85.9106 477.589 81.658C482.267 77.3203 484.605 72.5149 484.605 67.2417ZM459.6 43.6399C465.384 36.1554 468.276 28.8835 468.276 21.8242C468.276 14.7649 466.745 11.2353 463.683 11.2353C461.982 11.2353 460.876 13.1914 460.366 17.1038C459.855 21.0162 459.6 29.8616 459.6 43.6399Z"
            stroke="black"
            stroke-width="4"
            mask="url(#path-1-outside-1)"
          />
        </svg>
        <img
          className="logo"
          src={image}
          alt="n"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            zIndex: 1,
          }}
        />
        {[...Array(50)].map((e, i) => {
          return (
            <div
              className="circle"
              style={{
                position: "absolute",
                width: "20px",
                height: "20px",
                top: "50%",
                left: "50%",
                backgroundColor:
                  "#" + Math.floor(Math.random() * 16777215).toString(16),
                borderRadius: "50%",
                zIndex: -9999,
                opacity: 0,
              }}
            ></div>
          );
        })}
      </div>

      <Button
        size="large"
        style={{ marginTop: "3rem" }}
        icon={<GoogleOutlined />}
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </Button>
    </div>
  );
};

export default Login;
