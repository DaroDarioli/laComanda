import { Component, OnInit, Input } from '@angular/core';
import { Producto } from './../../Clases/producto';
import { ProductoService } from './../../Servicios/producto.service';
import { Respuesta } from './../../Clases/respuesta';

import { GeneralService } from './../../Servicios/general.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  @Input() producto: Producto;
  public tarea: string = "AltaProducto";

  @Input() esAlta: boolean = true;

  // imagen
  //public src:string = "./../../../assets/IMG/sinimagen.png";

  //public src:string ="iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAACGVBMVEX////42DPVpzVSk8/wdEwoaqPSPjT32DPUpjX62jPa09E/JyH31jP41y/RPDP72zLYqzRyTi7xzTTz9Pb/4DTqxDRUl9T00TTq5uRpRyzuc0vsxzTvcEfv8PLx8O7muzSKiotVOSgAAADfszQ0eLPWSDj/tpb 7pLd3d5FLSM2aphtaGEtcKplVkDQzMnmvjS1sK7Dw8bJoTT/86bvf1rmWj/RsjMVAAB9WjcwHxqzmSz/wqLIYUKlhiyVjnFKisW3kTCfmpb54Fp5XyJ3dXVkaG9VLDW0NyjbUz2JtORrVB6HcCdaRx0qFhtBZISft9hNYHGMaUJMVGGog1ZxYhyIblGVj4EMAA94OC/q35GCRzqOgHa6ubjAuIGvTjdmeY0bSGzyjWkhBQ/azHt5XEiKo8SzRy6mv NdjLtQOx//9Iu2soMtNkOKOyx3ZT4UUnwtMUteMy TRiO7tKR7VCV5d1XBsGqSg1qgQy5viaacdi RmaZELT5XJSHTumG pi7 52qsjXEfPlxGKRmpMi HUDhDPSxuSDp7HyRTTk1jNSBwQyEdABsAQm5DGBLgl3iJZ2HhuJeqhm1rZFo7VnLt6MCehjePeD4AMmEJKEMVJzdROw2QawBVdZWXhk9FPjrm3Z6knXvNyKMIBirPtkWwl0iVgoGuXkOsaFpUGxXPk3qMYUeNc1 bMSpZNxm4kl/s13I5LhcrJSK7QtEpAAAX/0lEQVR4nO1djVsTV7rPBMxkyAwzJBMmIYRMOigTIJ USCITExIuyGC3oFCVAG5b7fqBbG9r0 ptoWip2rXdVi5sd70qvXbptth2/QvvOWc EvATd2/D8clPCV95fM7P9/s97zljsdRQQw011FBDDTXUUEMNNdRQQw011FBDDTXUUEMNNdRQQw0YIB6Dr65CvNoL X9ATAYv8p0PiuBT4fhktZfzb0U85wIvn2T8FkvOdzYjW LpDvjNy4PSWzmLZUp4S7TIa8xAz6T/It9xTq72qv49yEGVlNOL00VLnh6YjseSBHN2ejDJnp1 OQwxvvDJZYuluMB2ZIpZgVnMXPBRBPPrfYZZPF6s9uL VchQC3PSAJBeLsAMHP9fTqCpATdNkzQDWA7g72pKd4AaTknM4no8E6WYgfs moDcCAKQJAihB3eG/rWBkuy6I9HMr5lLAkMzLCSHQBMESZAd6/i6mtgakJ686lzMFFclmmBIlkSSoxE5An2iGZxdzaQPKGhEcbMdtxJRCrAjaZ0XYgjJEgRwNblqL/RFgBSvFBg4F5cVN0ULAkGbyqkrqPZBw7BY7dW AOQ7kyBTWZOYgfXZrJtiIBfNt0DFpDXp6RA61l3VXu/OEU9wJRkwpJnFtJs2JaZ/oTEkKY0o2fEdhnlbMWF3puOAIQgLFJSaJjyDJvqORJ9AUFy8h5WricRkoHM5zs4RC0mnaXS08RVdKUz0wSz2YOVqYsl0Jm6ZlOx2NwvdJ00YpAznacjR Bl0NTgZorzqiy5kLgasVg5mLNvcpylPXZjoZ2THdKTay94JJgNWLsBZrVa7uxwfkCFuYWpGfIJkzt6LVXvVO4GcDditEHaO3kaINlUWeVPgZdA3QE1zOKmpZdJt1WD3UWWLK8c/RJUuKy3B0D3nsIoX8YSkC1HayswARZdtEH3BdNzDyhAtJVOIwlYFpY1XXVW1HwND7DiOlSFaYpIhxIDhNMsRUddaSs/gCD01fQ8rQ/SvRnUhckI5DBp0tK oSv0FDL/Dq0acjHK6EKPUlihIbJFjOc8hO/CKF5ZIWg8YMOrTZi5qCNEI kaIpEnmV9wqqPUop spCBhba6WyOZaTVJiaYtY1jd/XfY1VougKaVXwpCq0lWaEHrzqC4v/A7fO0CrojMgtgb9sgkiQJNGBV30BAobb8DVuqlwVmtwqMzmkw0BN17FKayzyBwEjYJR7hzRBlmnSpimimD/Qg1vHbd3HGXkNpbkUmqqsnzTl1Mp81HE7i5uaFqNmXgPqYJosB3vD9gyquhiBmuIlRP/3Zl5TkctUqKhhjlpuCgJiz/FzuNVQhq9BNRRBlQ3PLBPLXodZ7Ojp6bknVnvVO0E8qfsaVENVSMyIGwRZ7kcBV8MMAI6laq96J3CVzLxGoEi6wg5JokJXWYIkNWcD3GnPHazUtFxDoS2LchejgiDlXGC1zJUVmPuZ6Uy1F70jyNmo2a8hUU fotBf8KJ1N CXSpIBQqSotMKyi9NdeEX9jNsIiVEKWh0lRAMSRMAtUCwF1BPwFFQe6qqqCKhMnPJUe9U7QTxppN9WKEEnl1VWVYDb2axdCvgAS0CRz1MES44mUCaOW2/Yf8fs10Rpwm1VlOzIYLFYjOXErrCaTUhRp B0j7CsbwT2AmD7hum4h1VmY4ZEUERJMParObkBwNPW5pFjhYl81m5XFD6Z53T3w/KgTsQps4knjPRbS26UnAfyM/TQL8e6RhR IQ/CCXCnPOtLK3dKJZyE6CoZvkZDVxsg2LblLSVeUbkAzxK8oIwoSd/AIl5qmgtUMORux4GObvOVkb9lOasz7fStqkmeRdM1WDGMmx0paIphIMLtzRhXGBiosqAobpJFe4mYMbRkomUhcoW2R0QIxJxIqOrqQjqNNqpAJYxZWzFWDonWBPQzyApzXeVdiqKSHwUMfRQL81WSWcSs1JeVqPURhvIrr9w13xHPJxJZgUcaCmM nDnFCa4KNbWLHk1LXQ9fEc13FBXOynE lnL6fCQgit0YX4WaSl2Gp/FXiCl2G8hQUdW10sXSmsIunsNtFFMuN06lURjvt6ed4vS59XPT9 71QJy73RPGy9FYUOZmpjQxzyPO1B8 C9sXHQC/Li52ZKax01JLsaymXBglbVt LSYZWAHTDAL1VvosdqOY/lWjwLByWRgRt1CMr/KMuSNFEuyACufAMcOkzywwuEsipFhOTeNHaRgjjD0okkquksenqrnaF4HZc0OmOChDTW2QPR5Pm WyylLlDhzFOgOXFqiODE41MIRLNYM J3GJETEO6Xk8DbnRJK 1FinYuBHcHJc9yuM4MTwVKO9g0M5AQr3QVSh0XVhNsqw2MkT73NGAxFkT6oiTAam3WO0V7xTFtNEahs1vihacIH0RSFATag6GCtjtIObn83nFGgWyxE9N/WucXZNiQNtKJCl9EIPULNBttyvZbBYkb3CzEagpbt5UPLp6VEUUua2TmISx/x21lxurcLbm7mQOpxGpgpPneS6BGApmx7tyc5 mnBJnBywlgUYDUqXpnukpbAJ/JM07o1FJs0QnrHKpim18LRKSJAWM06nt IMS8d7awOJxbKqoWNKtnMlnDVejb3Qbm8HG4RIUMfTNN5LuKfkYEptjibFEYlTVRWiNAiI8BEGXZ2r1WUzaZMt0TCs8Pg2bYjaRVc39C9YnKU3HbqhOttLdbN2QIgG5NR54HExOYfjXAtaEUeUH3Nb3rzY29g5/4aRMP2MOgZmbb RxuF1DvoVJchNLBzgALW3j8kOAYG9vv8KXR/e2UqWBDM8lWdhYxCUuioo7Gk2iiGdPXGtstAGGLe/ztLmlb85lIkskCf4TlUVDp 9Ve nPC3lyBCRksLJYXW1sHBoGDF99nzdnFY1pRaSfNM3yyiqrBRFsGML9CyjBrKr 09Y4Bwi2Qi0tDw5VZDg8sTCyoGswjU9i47qI2lF2jlOvDkGG9RtJI 6TBkm4l88KaTUtsDpBFiMZXjQbbqMPrkFP8xnJVmSokBzFUmRSPaMkeTPn4bFkyCkjIFw0zqWTAl8B2rmQPppXEnmfNeqECQGaEsPFl6LRGsBQ86ZWTj324MG1kbQ6MppXVyGOjoyoq kRVVWVMxcymcwFBU1RUUlcMlPA8A5sZMD6QdvASC/4kFaSPjfAgsKTPL qLCTVC78uDgwMLP56n4HR4hNMElOLltdYOUrwBSQrJ0WdwKXohy4olufX3k5SSTV09 EbKkFpbVNYGtPCerXX/dyQuxTJbgcFPkXRAqwitMk2uNvEU 6jPxwIX7h tyB2jQqENjuFXpkkNsHCf LDBWCATnRSnST0I to5NKnfvFhS tXXbdCuVzhYZIiKadgjBQz32OjpFO9V1c5fcp069Q f6OlHmAjvJwSxdQZJ0X5lHxUqxMpJzZK6v9w2HYsy0mUWR7p2RrJLvQDfi39ny/fTRXu3lWjFJXfnxA0TaXcWERDOZbLiaf32mw3soHylLeRbPMq5PdT5u27y6m7Dx9e4gLJNxQnBSfCaYL5pO3Z/361Ef8zKJWG zeCD2y2f6gELIhQQq2naZRz fTGZmZipmXj8OjI3Yf5gJ3LS4A7Cwiy7u92f/1bGLI12lrrW1t// m7tr0zNxZYHk5Ck9qIME3x6VuZzE8zrb3Dex/c8XjCYSWZvi5FBSGdZOkABsFQPG2zNfZCT9L6 6 DQ60tM02KG4R2NFvKUHxytZQJnx7eawMV4wmXRV5/WCjK/tL3369d4iQpsPv9TPw0kOBwfb1G8cDnw9Dm5t5X00mfAJC8U5r47MdvQIpqs9n2/t1iiWndQ5fseS8akL7P7XoR v/cC0TYWq9T/OprLTDU9/d/ODc393N4avOz/vp9m5CfrXFGtnjWzf17/ R6DoOMVOyFa9cJttS37Pt0Dn4BaLa2bHyzPrHR0gp CBiCP8M5IELcNrc9J3obTYaAF9DTzX7AtL5l5ifgXvqRQAFD217b6b8Dbp4MJs1RE8XTeyFDqKX9Gz 9PVffuu/rzwGnjZ8yE5/1G6LdFz79wySSXSzTUO0l7xB/H9YZ9p9YDh ZCLcAIX76IYx GwY/yPBWRHcok7iJ0H9iGLmQ3pnl5VDwjHfiH3Mb32xmNn9CaVqZoTGUEJ/EzAot8hxyNA8upkIPU31e7/LXyxczE Gy HSGBf3972E3JiTPQEcz9PFmKJRKXQmWvgsvX3gw9MPGFoKtrx4QwXtd4lRsHZtS0EAEMnygKqvplGN5c3p9 coZdahxaG47w5zF5e/6uW9iudoL3jHip3tBOcGBYmHzx182l1PeviPhY7arM9sYfl205G797G16ex03RwOCxfC1UTiBISh/e3N/Ktg09svYl7aPt5ohyMhlOTztaAoGw2FMtplMxIaP7b2W4Kx2H0//E5iit  XI8sftzzC0N 1fz3zc1OTozSFQTVYidjcA9uQChhGCTZ9OASEeGRs7Fj9NoZfbU55Q6nvNoPB4JXru78a3ILilyBWfMGh RL TMiRauo70re8XYZfLTd5vY7UufXglTdFGa kRj4GGF5LAyE6KTZ5OAiF2De21ZXWtwT7 pqavKFXStPr4eVcEafhYH/XNcBwKC h21v4o45Qqglga8RvCY6NjQGGqaBj/2QxFnNhlNZETvQ OHZ1aOgGh677otwhaIlN3guVQmy54tUIhq6EoCONY RN4yd699qGrs7N/SOLhoRoXnE4Ut6mpmBfRdYdDPZBgg7HlRBKaFz4uJr4D4AgQuNIAE3rUcKZUCoEGX5mEryx7O0DfibouOLAy8UAJwMk2KgxtB1LarfSsQuHHQ4oxAlNiK39wSA0TG8QqChWB38BXJ/3DhsEbVcVTru9hR8NOYAQveHPEcP ZY1gKHTl q7vOG2HODxsK2NUgrtqNElFUyEkxPAMKPv7gyEtToRCy1P4mJ8GUFTYGssMryXRphNs4DugJXqDQIj9oaAXmKAXiPXLr37EyIVCuP5cNkJNTSV4ewtBEM5/pmDECJ7Z6A8hBQVeNJRqefUAZrVv7HTZCJEsm AGvgDnZNKHU1BPm4JX4AskmLoBTHLfNxgFek2EZQEOt7bari1w2o0KBD2aSoW8TaEQIhh0pFInUH3xNValISx8TewFBHqH1IAdpt80DdLTlCPkDUJ/4wgBCc61IIYHCs/ d3cPpipEqG3K7P1CsqO7aGmCHXGkgkEgwyC0wJSewbXs26z2qncA/4kKK9T63a1ITdEVPJTvT4ChA8oPEDQaGi1YGWL8dIUI9W2n4TxsZjjhniGfTzk0pBxmx6Zl34/4TD5ZipXB3th2 gyeyJfgAx oJIiJQIDBYCo009JqtDIOYORq5AoZmgxn0nCM3SmBkMGPQhUNeoNvvjX99ozJUKz2uneAXJniXlMNj4KQyKFTXfwZYIZAht4gPdCxPmcwxOpGmjJFk2H9MWCISgKEfYqFDENNY0dGKYY5ew5JsfXVA1ilpp7zc1sdja6mKmcVaLd0JZRyBAHDozxNMB0TqDP1Kl4ybHut8z GtjFsGYkmVMnqA4FxFAR9h7evTwVGySxOz2DI0DXbvufkx0Nb7LD mJSFdSKcMM2nDh8 nHpjBOQADHn8RCtiiJWWWsT2Pd2IY9kO6/sVxThSwlmTAJ9MX1QEgjk70YqfDC2Rzj17AMf5/3ow3GpSfF/VT1twbhoe WWps6UkxSyW4NzCq5/i1CcFDJfa92gcl949bUT1jVHEEPLTrkpkyA yPDMAGLbMvCtWe807w xJxBCgvX3 j /OoKGLlp8l7fAhPLlNAlD8BwoLGH747h87P8Kr1RaZ39PdrTNsrjvY3glY/ufp/vdhHcyhqWegopTgk0asBDNwcb69rvkyXq2ogiFBgDqA5mbEcxnmprAj5XRHowEpcenCukIxA PNdXWHsCoPLfJrFQzb6ww0d8HLPziaptKXlEtqXl0gOy5Encl5wPCjgljtVe8EOUNFIQ6WGb6ODuSDOlgAscItEMAGL3CSCv8P/vDOKbHay94BXq8QYXddmWFnEh0/FCgCmiHBUERSiWZX0C8PvXMKn/Ip3vlYEdbVtSvatW1uoKigUBTc3N/UEaijOkVsImKln9lTQRCoqXb5ByijJEnirNnw/J6DzcZv33nnI0zawm0rj/UzEAfz2tUYiVVFUVbV9Fsr3fp/AXC2db/73Wy11/58KD5JSQGPbjUA7 FxuhcWkj6Sv3 yG74DhJLOlfFvl87/FY ZqMITRQi4tIelgN0u QRaAEFxFLmi9vlv80qCCy4tDVZ77c FLUp6sG47xbr5oxy6ptXKJcLz3SB1/WM K3GSm 64hUnUdw2Wo2H3IwSBuXXvHz2qKFllZAmmdufVBGeVBAIWirjszrQVTEN8RIQH/2f2svimAxTAbxz a3d390oeXlmDdqVAgorPpayxFV2Mj4hw0GOx Pdr3eC/gkQ1CfXVLqGbzEnmLC6XfEAx3tzT/RiGh6CQIvsdIa835D2/dH5JdWsP10MHoJiB45ervfLnRi6ZPw9Ibnelp2BIL34ZCjb1ecfeWDp58i95d/nSIYLswKZX478Dwp4yMn4ThIvmChFehgMXuTdD3qa sYlvl1bEeHwVJnJ2JzrRxpzF5hkzcdjC50Bapi6vdLYf1ArE5uZDSAnF/UHIcEyMw0lLdO2n/kgvZhGbZ1jmjJYTx9mzt7tmV17rhJhFvrKwH8hw7Je39QGaEmSonUpkFv8bky02VwmoHqBnh9dacatw1W2yeRdkfP/ K01HxsK6QsagO9Ue7gEYYqKl8iocvaBpwRcF2Uppu/fwx0QAQx/jIOJDhsgOcdHSIrxoRyDRE8do3zPCePy sTsMAuI5TGa/pkAZGNDPabOfPKPo07UUHZnF5iJBFZQPTv0hx Sz8pSM5kuhGQo9mNxZimKFflabOSs 491r5pQGfFjub7G fx25JGeXWO0kOnn86QMInstpTov4yNFgMq1wK2o KY8ZePoDG2OxwQSakaZpEiRtJTwYutZANNQfps4sPvW5RnKuLXL9dkKS0PU7A8dv4XHXpZzm7Jx LzD99ItkI0W5wRMXb43cTqfT6oTosmDRUIwlkW9ENx8OPN2y5AK6L9nj8gOmaIYdi2fKgWiIPAdKNJ9 NDs2Px5rqHycR/E6BptsfmCGnEBqN5d0PNUM453te26eH8zFIvCpOm2R3ODSH2bF32idLw5ZAbECXRJEP M Zxfcouru3jN/c lbgKWb8911zYdOFXb58TVXLqGVe0hJ7z3NDMV22OkYH1yBHY/u7vaDqHF16J3BXV1CFWNdIGVza1cgMU 9/j/SCRur48AOC4BcuS136J3ZXUxRznliKmd1s hpcWRHWHyybxyEBG8CT OJdDZXdnMAxd2rqPC2/GKXmo0yLM zwnTBIz7prZF5yPBkpKGhbRtDqKi/4Zp3BvQ8AFmOXxanNjenxJjL8sTrV0TYU 2ez3lkS2Fb57h5F28IN8TkbU9YeVIId41rTeOTYkzcJkIoxI92a/rW8G1u6yPVnqilDeLrWte4cpO0guIu7Q1HVtrnx8VYg0fj2OaJFZ7kaXIROTd E45NPYYg1NNdKcQInITq3nNz6fz1wUKhML70l788MR4WgDrLRXH825uAIoTGDOJge fJwdhuLKTkyp1DuLe28tqhJyqb2IDgaYiJ4uA4aqh2g4/5lfFBMQZ7xZFdGBRfRzkKjN7t7TBB6YxHTj2RoR9ko7LO0gKfZSkjL xpM4y4bfepaQ45jooRqNfaPLOnntwejIhi0aD4GLTtOhlqo16Vu74rljbxqQ5DjokFMRZpkD3b/JGrLbYLq/1ZpKMHtzK8fOpZDsNfhB3w9yKyxwP NkSKORHeSLfrBGjk0ZUbhs2dHnl2h3NOHo/fv1vPq19uf2TT9 Ds7KHfYdF4eR5oVrh9z7fuJWKY625/3OzFofHdGLhfCLPbHSmyxIOvF3efS3wxeB6jpM11nWJbAybjhs9EwxKs9g5u4df9OtDQl0aGcmzwZoWSgux5fhz5mNzu7UfsDH7ZUyycn 9GSWl352uDOa2z2/DSOJoG9KjttnhOvJyLFfXyECTPGHSwnxOu CNPS7e45PguzU5eCK5ibOsDcOVIBJPJkeeGDNRTRiTbZJBNF182fhAuOVIsFmNxWZZfJvWsoYbfCv8H0cdXrTwVGXoAAAAASUVORK5CYII=";

  public src: SafeHtml;


  public files: File;
  public filestring: string;
  public show: boolean = false;

  public imagePath: string;
  public imageNotFound: string = "iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEXz9Pa5vsq2u8jN0dnV2N/o6u7w8fTi5OnFydO+ws3f4ee6v8vY2+H29/jy9Pbu7/LJztbCx9HR1ty/NMEIAAAC8ElEQVR4nO3b67ZrMBiFYaSh1HHd/8XuFap1SFolXb7s8T4/18EwOyNCiSIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACryrezAy2kulR+lVl6dqip7Jr412Zyeizj7yjODjYqvhRQTMQm/1rC/OxsvapIht3xehDeN1lIOBSrtt+ZW+t1Kh02GrciEvaDNLl4Ph1e+hqvEk4Z94SZ580WchJGJNyHhH/JlrDR+uC+iU6Yqf7c2JXNga0KTlj/xOP5ujuwdpabML0mz1VXUu7eqtyEP5OAvysdvXerYhMWs4C/a+e9uyg1YXVdXh7sXTtLTagXFcaJ2rlVqQmXgzSOu5f76J5shSasylXC/NVJUbknW6kJLx8lNPNu6WhRaMKPRmmtzB+7WpSasNk+09TjmdPeotSEVbfs0HW7LFXjh2FvUWrC1Z1F1yCt1aRtW4tiE0ZqPk4dp4NUzYaypUW5CaNuGtExjdSLz8HSouCEjRqvnuLcceE/b9D+UQhOGFWZys093e7S2IfoqkFbi5ITRv1NDN24ds7SoKVF4QlfsTa4bjHchOmPI+AiYrgJXQ0uB2qoCWt3g4sWQ034qsF5i4EkbBY3ol43OGsxjIT6luvp7NG+DfhsMYSElc7jpHteAL85BhcthpBQ38zPny1uadD8x3C9JT+habD/RXdfu21rsP822fy5/IR9g/GjxXpjg+ZSKoiEY4OPFrc2GEzCR4O9XL87D4aWcNrgEHFzvkASzhv8UAAJVw3+dwkPNRhAwoMNBpDwYIPiEx5uUHzCww1KT1htX7qEmnD9/SEJSXhutgEJSUjC8/lOKPs+jfla7ajh/qPUhP6Q8C+RcJdKUML7W0HK75vA9+/hrmenM8bHgr/y7pqS8O7a43nEb7x/6Pvo3iddPa3njYx3SKMoO37rwu4mo8LIPJB4fLG2lggZoz3d5l6PQuPWahHTzEgXF79KQQUCAAAAAAAAAAAAAAAAAAAAAAAAAAAAp/gHLTI30QIHnooAAAAASUVORK5CYII=";
  miReader: FileReader;
  // fin imagen

  @Input()
  set name(name: string) {
    this.tarea = (name && name.trim()) || 'AltaPipe';
  }

  @Input()
  set foto(foto: string) {

    //this.src = 'data:image/png;base64,'+this.imageNotFound;

    //this.src = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.imageNotFound);
    // this.src = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+ foto) || this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+ this.imageNotFound);
  }


  constructor(public servicioProducto: ProductoService, public servicioGeneral: GeneralService, public sanitizer: DomSanitizer) {
    this.producto = new Producto();
  }

  ngOnInit() {

    console.log("Es alta: " + this.esAlta);

    if (this.esAlta) {
      this.cargarImageNotFound();
    }
    else {
      this.cargarFoto();
    }

  }

  // imagen

  obtenerImagen(event) {
    this.files = event.target.files;
    var reader = new FileReader();
    reader.onload = this.manejarleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.files[0]);

  }


  manejarleReaderLoaded(readerEvt) {

    var binaryString = readerEvt.target.result;
   // console.log("Se modifico la imagen");
    this.filestring = btoa(binaryString);
   // console.log(this.filestring);
    this.src = 'data:image/jpeg;base64,' + this.filestring;
  }

  cargarImageNotFound() {

    console.log("Estoy en imagen not found");
    this.src = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEXz9Pa5vsq2u8jN0dnV2N/o6u7w8fTi5OnFydO+ws3f4ee6v8vY2+H29/jy9Pbu7/LJztbCx9HR1ty/NMEIAAAC8ElEQVR4nO3b67ZrMBiFYaSh1HHd/8XuFap1SFolXb7s8T4/18EwOyNCiSIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACryrezAy2kulR+lVl6dqip7Jr412Zyeizj7yjODjYqvhRQTMQm/1rC/OxsvapIht3xehDeN1lIOBSrtt+ZW+t1Kh02GrciEvaDNLl4Ph1e+hqvEk4Z94SZ580WchJGJNyHhH/JlrDR+uC+iU6Yqf7c2JXNga0KTlj/xOP5ujuwdpabML0mz1VXUu7eqtyEP5OAvysdvXerYhMWs4C/a+e9uyg1YXVdXh7sXTtLTagXFcaJ2rlVqQmXgzSOu5f76J5shSasylXC/NVJUbknW6kJLx8lNPNu6WhRaMKPRmmtzB+7WpSasNk+09TjmdPeotSEVbfs0HW7LFXjh2FvUWrC1Z1F1yCt1aRtW4tiE0ZqPk4dp4NUzYaypUW5CaNuGtExjdSLz8HSouCEjRqvnuLcceE/b9D+UQhOGFWZys093e7S2IfoqkFbi5ITRv1NDN24ds7SoKVF4QlfsTa4bjHchOmPI+AiYrgJXQ0uB2qoCWt3g4sWQ034qsF5i4EkbBY3ol43OGsxjIT6luvp7NG+DfhsMYSElc7jpHteAL85BhcthpBQ38zPny1uadD8x3C9JT+habD/RXdfu21rsP822fy5/IR9g/GjxXpjg+ZSKoiEY4OPFrc2GEzCR4O9XL87D4aWcNrgEHFzvkASzhv8UAAJVw3+dwkPNRhAwoMNBpDwYIPiEx5uUHzCww1KT1htX7qEmnD9/SEJSXhutgEJSUjC8/lOKPs+jfla7ajh/qPUhP6Q8C+RcJdKUML7W0HK75vA9+/hrmenM8bHgr/y7pqS8O7a43nEb7x/6Pvo3iddPa3njYx3SKMoO37rwu4mo8LIPJB4fLG2lggZoz3d5l6PQuPWahHTzEgXF79KQQUCAAAAAAAAAAAAAAAAAAAAAAAAAAAAp/gHLTI30QIHnooAAAAASUVORK5CYII=';
  }

  cargarFoto() {

    //this.src = 'data:image/jpeg;base64,' + this.producto.imagen;

   
   this.src = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.producto.imagen);
    //this.src = this.producto.imagen;
 

 
  }

  

  accionProducto(producto: Producto) {


    let pruebaFoto:string ="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";
    
    let enPostman:string = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAA+AEgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCHwP4Rn1a01PUGcpJYwrIIo88g5yTj0wPzp8a6klu6tfq6n5CGQKVHTr/WtXxN4i13wbaLrPh3R7i7uY22zyAfuWi/iXHU5x+HWs+3+JfgTxfaRJCjaLrhOZIrrcGl4JOGHyt9eDXXm6oVsQ3Tknp1/wCCefgfbKkueLTuT+GPDHhk3JXUfEdxPKjAMIISsYJ9CTk/XFd5DB4E011B1EkrxgLIS39DXja+MNF0jWbkXJ/tQOU8mOLdkMM5xgj196W++IEc0hWH4f6iZFPIe6dD/wB8la+V9l9XVoRhfvJO59DFVKzvUcreVj3GHx54R02I2+ni6llCkqgjCD8azf8AhI11/Uha6hZuI52xFH/tA8A+xya8dPxBubULdW3wyuLaU/L9pO6c/gDxW54R+LngyC8ivtZh1aC9gbeEktwFZ+MZbJxz7V20MRXqVI801yrtojGvhIRg+WLbffVnVfEKPWbO4cW080MDYO0t8oU8j6Yrx02M/izULzX7iRhZWjG1sPNziR1+/IR12qDk9OWC5r0fx54xfxVpyWWhXltPcam5UPCQywR/xE4zwMgY5zkD+IU59HstO0K0tBt+z2kITaW6YHO7sSSSxPck+uK3ny6qOl/yOWzWrOMtNb03TdMXStNnmaOPJcwx8u2cli2OporFvsC7nmhIIBx7Hn0/GitoRdtDOTVzsrfXNRiRopZ8KflUNyMnp+A5/KuWexk1ebUJtH08x2oYieWLCb25JUHHHTp/k9P8WBbWviS30uwnV5xZmRyvQOzEbc98BR/31WVpF1ZeHIYYpbi4ltJGEkkQ+URsAPvfjzXk4utPCQ5Ptfkexg6Eai57bkOgQ6G4eO1gtra4WMtLHIAW3KMHDHkjP6nFdhIDp0FsdSuxZiRdqKqBg5BJ54IB+o/Os2DVPCV3qQnt7mxN0SMxzSKjHGOQVXPb/Oa1Lh0i08mSaO6guGdQS+4qD1QNgdQOvB4NfKznCrK8rpvuevytLYjuNVTyYbmyuZ7iC0bfJvlXCsWK5AC5Yjd1X/8AXleJr7RNRFxr11cXjMQY28x2eMt1weARwehyORTZb5raCez0w7bK9UGRJGVnRuMjIA4z7fnXJa/4aDu8sj3FvLuDCEqxAz/vdORXXQrqMXGT0JlRu+aOjFubW+tvCklx4f8AM07zpRLDcpF5Qm2k5UY6AE9upyOQMBvh34iPqQ/sXxCr2moJhN7Hhwen/wCse1aC6tqWl6UNN/sea5W1TdGHVlikU8g+gPJ55BzWB4s8J3etaYdUtbVIpk/exyLgEE9UIA6HHHHv3r18JipOf7zZ7f12OCthoqnsb95AsUI+zxIybugOW/L3oqz8HJX1myiN380tujKit1DDGc/maK9SWJ9m+Wx5MqVmUfilLJY6xZ6uy5SJvKmJ/ut0J/EY/GmXsun65sknu0iN5uDKrbNx+pBG4k5685I4rpvippqXWm3EUSCXfF0x3HI/OvCdJ1p9Klazu0aWzY490/8A1etLG4TnS5TswOKSvGR1lj4YeyRbmTT0ktVkZZHLBgBnB3AHI/Gp7DxZYeH7m2tJEW50/wC0AyJKu7ylwRlR7E/lmus8FeJtGvdNe2vLhrpWU7G3bZFB6rwRuyK5Pxd4bsr5IdM0a08672mTzQG3kdgV3Y/T0968GF1VtiD2ZVXKNoHrVgdI1u0t5bWK1SOcKFdGCg59Dj61Xm8N6tdXHlhoJZY0YxFZUG5VOCeSP8TivFvD2i6xb6XcLDeSpdQ3CgWJcqSRkE89COK62bx5qttbQQrYix1CI/vELMCcY7Zxzz2rKtQpTk1DVeRVOM1/wTqYFSe0MOmLL9pCP55LALtIC+vTn+VZE7XVjdrFe6crqsOwBrgIeepKsNw78YzzXTxwtf6XbaoutLZJPCDdQLgpznOVyM579Tn868819NLs7wTSXou9v3flbbuz0wev5etPBYarKpZa/kZVq0FFm58KTMNVzEWVvNlmIxwAQcnpxyR+dFdJ4e0ief4aeJJ7ZhbaveWbMnlD/VhVJWNc9zyCf9r2FFfVyy+pUSmup87OtByabtYuTNHc2bxynJIJya+dfHGnXFnqE0jp8rMW+Xt/9avZ7m/kiLYztI4Fcfq4t9Ys2guIyDzhx1FKu5YdxXQVK1S76njMd3c20xe3lZMHsa27DxnrFuVzKXx3PWm+JdCbTZseajq3KkDB/GsLbhqtxhNaq5tCrKOiZ3tl8QrxJjNLaq8rHJkKgseMdahvPF63D+ZNpqSuRjLYOfzNcrFIgjywPFS2775PkBU+uaX1KitUh/XKt7HRTeKdYmhEEW22iAxsxjA+nat34f6Vc6rqK3lyXe3hPzyOep/ur/X2o8A+CI9WX7dqd0TbqeIYuC31Pp9K9StbWCBIrK1iSCFOFVRgCtoULRutjKpiG3Znb+AomIIPCMSWyP4QMn8MA0Vn+JdVPhf4ba3q0KF5lsmgix/C8g27vwBP50V7GHlGjBRZ5s6cqsm0f//Z";

    let datoEnBase:string ="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";

    let datos = "nombre_producto=" + this.producto.nombre_producto
      + "&descripcion=" + this.producto.descripcion
      + "&id_cocina=" + this.producto.id_cocina
      + "&precio=" + this.producto.precio
      + "&imagen=" + this.filestring;

    if (this.esAlta) {

      this.altaProducto(datos)

    }
    else {
      let parametros = datos + "&id_producto=" + producto.id_producto;

      //console.log(parametros);
      
      this.modificacionProducto(parametros);
    }


  }

  modificacionProducto(parametros:string)
  {
    
    this.servicioProducto.procesarProducto("ModificarProducto", parametros)
    .then((respuesta: Respuesta) => {

      console.log(respuesta);
    //   if (respuesta.resultado == true) {
    //     console.log(respuesta);

    //   }
     });


  }


  altaProducto(parametros: string) {

    this.servicioProducto.procesarProductosPost(parametros).subscribe(
      respuesta => this.productoCargado(respuesta));
  }


  productoCargado(respuesta: Respuesta) {

    console.log(respuesta);

    if (respuesta.itsOk == true) {

    }
  }

}
