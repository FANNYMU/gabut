import Content from "../../components/content";
import HeaderLeft2 from "../../components/v2/HeaderLeft2";
import Search2 from "../../components/v2/Search2";

export default function Homev2() {
  return (
    <div>
      <div className="flex px-28 py-5 bg-[#0C1317] h-screen">
        <div className="max-w-[30%] bg-[#111B21] w-full">
          <HeaderLeft2 />
          <Search2 />
          <hr className="opacity-20 mt-3" />
        </div>
        <div className="grow flex flex-col justify-center items-center bg-[#222E35]">
          <img
            src="https://static.whatsapp.net/rsrc.php/v3/y6/r/wa669aeJeom.png"
            alt=""
            className="w-80"
          />
          <h2 className="text-4xl mt-6 font-light text-slate-300 text-center">
            Unduh WhatsApp untuk Windows
          </h2>
          <h4 className="text-sm mt-6 max-w-[560px] text-slate-400 text-center">
            Buat panggilan, bagikan layar, dan dapatkan pengalaman lebih cepat
            dengan mengunduh WhatsApp untuk Windows.
          </h4>
          <button className="mt-6 py-[10px] px-6 bg-[#00a884] rounded-3xl text-sm font-medium">
            Dapatkan dari Microsoft Store
          </button>
          <p className="absolute bottom-14 text-sm mt-6 max-w-[560px] text-slate-500 text-center">
            Pesan pribadi Anda terenkripsi secara end-to-end
          </p>
        </div>
      </div>
    </div>
  );
}
