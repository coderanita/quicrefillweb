import React, { useState } from "react";
import {showSweetAlert} from "../Includes/SweetAlert2";
export default function UserProfile() {
  const [isBanModalOpen, setBanModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Profile state (controlled fields)
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    username: "Doe",
    email: "samuelministar@example.com",
    phone: "090123456789",
    country: "Nigeria",
    state: "Ikeja Lagos",
    location: "Third mainland bridge, Ikeja, Lagos.",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };


  
  const handleSenspend = () => {
    showSweetAlert("Profile Supended successfully!","info");
  };

  const handleSave = () => {
    
    setIsEditing(false);
    showSweetAlert("Profile saved successfully!","success");
  };

  const handleBan = () => {
    showSweetAlert("Account has been banned successfully.","success");
    setBanModalOpen(false);
  };

  const handleCancel = () => {
    showSweetAlert("Action cancelled.","info");
    setBanModalOpen(false);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-1/3 p-6 border-b md:border-r md:border-b-0 border-gray-200 md:mr-4">
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2">
              <img
                src="/images/Avatar/profile.png"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-sm text-amber-600">Ikeja, Lagos</p>
          </div>

          <div className="text-sm text-gray-700 mb-4">
            <p className="mb-3">
              <span className="font-medium text-gray-400">Email address</span>
              <br />
              <span className="text-blue-600">{profile.email}</span>
            </p>
            <p className="mb-3">
              <span className="font-medium text-gray-400">Phone number</span>
              <br />
              <span className="text-gray-800">{profile.phone}</span>
            </p>
            <p className="mb-3">
              <span className="font-medium text-gray-400">Location</span>
              <br />
              <span className="text-gray-800">{profile.location}</span>
            </p>
            <p className="mb-3">
              <span className="font-medium text-gray-400">Status</span>
              <br />
              <span className="text-green-500">Active</span>
            </p>
            <p className="mb-3">
              <span className="font-medium text-gray-400">No. of orders</span>
              <br />
              <span className="text-gray-800">15</span>
            </p>
            <p className="mb-3">
              <span className="font-medium text-gray-400">Device name</span>
              <br />
              <span className="text-gray-800">Samsung Galaxy S21 Ultra</span>
            </p>
          </div>

          <div className="flex justify-start mt-10">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md text-sm focus:outline-none focus:shadow-outline w-full md:w-auto" onClick={handleSenspend}>
              Suspend user
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-2/3 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Profile details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  !isEditing && "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  !isEditing && "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={profile.username}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  !isEditing && "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={profile.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  !isEditing && "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={profile.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  !isEditing && "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Country
              </label>
              <select
                id="country"
                value={profile.country}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline ${
                  !isEditing && "bg-gray-100 cursor-not-allowed"
                }`}
              >
                
                                        <option data-countrycode="AF" value="Afghanistan">🇦🇫 Afghanistan</option>
                                        <option data-countrycode="AL" value="Albania">🇦🇱 Albania</option>
                                        <option data-countrycode="DZ" value="Algeria">🇩🇿 Algeria</option>
                                        <option data-countrycode="AS" value="American Samoa">🇦🇸 American Samoa
                                        </option>
                                        <option data-countrycode="AD" value="Andorra">🇦🇩 Andorra</option>
                                        <option data-countrycode="AO" value="Angola">🇦🇴 Angola</option>
                                        <option data-countrycode="AI" value="Anguilla">🇦🇮 Anguilla</option>
                                        <option data-countrycode="AG" value="Antigua and Barbuda">🇦🇬 Antigua and
                                            Barbuda</option>
                                        <option data-countrycode="AR" value="Argentina">🇦🇷 Argentina</option>
                                        <option data-countrycode="AM" value="Armenia">🇦🇲 Armenia</option>
                                        <option data-countrycode="AW" value="Aruba">🇦🇼 Aruba</option>
                                        <option data-countrycode="AU" value="Australia">🇦🇺 Australia</option>
                                        <option data-countrycode="AT" value="Austria">🇦🇹 Austria</option>
                                        <option data-countrycode="AZ" value="Azerbaijan">🇦🇿 Azerbaijan</option>
                                        <option data-countrycode="BS" value="Bahamas">🇧🇸 Bahamas</option>
                                        <option data-countrycode="BH" value="Bahrain">🇧🇭 Bahrain</option>
                                        <option data-countrycode="BD" value="Bangladesh">🇧🇩 Bangladesh</option>
                                        <option data-countrycode="BB" value="Barbados">🇧🇧 Barbados</option>
                                        <option data-countrycode="BY" value="Belarus">🇧🇾 Belarus</option>
                                        <option data-countrycode="BE" value="Belgium">🇧🇪 Belgium</option>
                                        <option data-countrycode="BZ" value="Belize">🇧🇿 Belize</option>
                                        <option data-countrycode="BJ" value="Benin">🇧🇯 Benin</option>
                                        <option data-countrycode="BM" value="Bermuda">🇧🇲 Bermuda</option>
                                        <option data-countrycode="BT" value="Bhutan">🇧🇹 Bhutan</option>
                                        <option data-countrycode="BO" value="Bolivia">🇧🇴 Bolivia</option>
                                        <option data-countrycode="BA" value="Bosnia and Herzegovina">🇧🇦 Bosnia and
                                            Herzegovina</option>
                                        <option data-countrycode="BW" value="Botswana">🇧🇼 Botswana</option>
                                        <option data-countrycode="BR" value="Brazil">🇧🇷 Brazil</option>
                                        <option data-countrycode="VG" value="British Virgin Islands">🇻🇬 British Virgin
                                            Islands</option>
                                        <option data-countrycode="BN" value="Brunei">🇧🇳 Brunei</option>
                                        <option data-countrycode="BG" value="Bulgaria">🇧🇬 Bulgaria</option>
                                        <option data-countrycode="BF" value="Burkina Faso">🇧🇫 Burkina Faso</option>
                                        <option data-countrycode="BI" value="Burundi">🇧🇮 Burundi</option>
                                        <option data-countrycode="KH" value="Cambodia">🇰🇭 Cambodia</option>
                                        <option data-countrycode="CM" value="Cameroon">🇨🇲 Cameroon</option>
                                        <option data-countrycode="CA" value="Canada">🇨🇦 Canada</option>
                                        <option data-countrycode="CV" value="Cape Verde">🇨🇻 Cape Verde</option>
                                        <option data-countrycode="KY" value="Cayman Islands">🇰🇾 Cayman Islands
                                        </option>
                                        <option data-countrycode="CF" value="Central African Republic">🇨🇫 Central
                                            African Republic</option>
                                        <option data-countrycode="TD" value="Chad">🇹🇩 Chad</option>
                                        <option data-countrycode="CL" value="Chile">🇨🇱 Chile</option>
                                        <option data-countrycode="CN" value="China">🇨🇳 China</option>
                                        <option data-countrycode="CO" value="Colombia">🇨🇴 Colombia</option>
                                        <option data-countrycode="KM" value="Comoros">🇰🇲 Comoros</option>
                                        <option data-countrycode="CG" value="Congo">🇨🇬 Congo</option>
                                        <option data-countrycode="CK" value="Cook Islands">🇨🇰 Cook Islands</option>
                                        <option data-countrycode="CR" value="Costa Rica">🇨🇷 Costa Rica</option>
                                        <option data-countrycode="CI" value="Côte d'Ivoire">🇨🇮 Côte d'Ivoire</option>
                                        <option data-countrycode="HR" value="Croatia">🇭🇷 Croatia</option>
                                        <option data-countrycode="CU" value="Cuba">🇨🇺 Cuba</option>
                                        <option data-countrycode="CW" value="Curaçao">🇨🇼 Curaçao</option>
                                        <option data-countrycode="CY" value="Cyprus">🇨🇾 Cyprus</option>
                                        <option data-countrycode="CZ" value="Czech Republic">🇨🇿 Czech Republic
                                        </option>
                                        <option data-countrycode="DK" value="Denmark">🇩🇰 Denmark</option>
                                        <option data-countrycode="DJ" value="Djibouti">🇩🇯 Djibouti</option>
                                        <option data-countrycode="DM" value="Dominica">🇩🇲 Dominica</option>
                                        <option data-countrycode="DO" value="Dominican Republic">🇩🇴 Dominican Republic
                                        </option>
                                        <option data-countrycode="EC" value="Ecuador">🇪🇨 Ecuador</option>
                                        <option data-countrycode="EG" value="Egypt">🇪🇬 Egypt</option>
                                        <option data-countrycode="SV" value="El Salvador">🇸🇻 El Salvador</option>
                                        <option data-countrycode="GQ" value="Equatorial Guinea">🇬🇶 Equatorial Guinea
                                        </option>
                                        <option data-countrycode="ER" value="Eritrea">🇪🇷 Eritrea</option>
                                        <option data-countrycode="EE" value="Estonia">🇪🇪 Estonia</option>
                                        <option data-countrycode="SZ" value="Eswatini">🇸🇿 Eswatini</option>
                                        <option data-countrycode="ET" value="Ethiopia">🇪🇹 Ethiopia</option>
                                        <option data-countrycode="FK" value="Falkland Islands">🇫🇰 Falkland Islands
                                        </option>
                                        <option data-countrycode="FO" value="Faroe Islands">🇫🇴 Faroe Islands</option>
                                        <option data-countrycode="FJ" value="Fiji">🇫🇯 Fiji</option>
                                        <option data-countrycode="FI" value="Finland">🇫🇮 Finland</option>
                                        <option data-countrycode="FR" value="France">🇫🇷 France</option>
                                        <option data-countrycode="GF" value="French Guiana">🇬🇫 French Guiana</option>
                                        <option data-countrycode="PF" value="French Polynesia">🇵🇫 French Polynesia
                                        </option>
                                        <option data-countrycode="GA" value="Gabon">🇬🇦 Gabon</option>
                                        <option data-countrycode="GM" value="Gambia">🇬🇲 Gambia</option>
                                        <option data-countrycode="GE" value="Georgia">🇬🇪 Georgia</option>
                                        <option data-countrycode="DE" value="Germany">🇩🇪 Germany</option>
                                        <option data-countrycode="GH" value="Ghana">🇬🇭 Ghana</option>
                                        <option data-countrycode="GI" value="Gibraltar">🇬🇮 Gibraltar</option>
                                        <option data-countrycode="GR" value="Greece">🇬🇷 Greece</option>
                                        <option data-countrycode="GL" value="Greenland">🇬🇱 Greenland</option>
                                        <option data-countrycode="GD" value="Grenada">🇬🇩 Grenada</option>
                                        <option data-countrycode="GP" value="Guadeloupe">🇬🇵 Guadeloupe</option>
                                        <option data-countrycode="GU" value="Guam">🇬🇺 Guam</option>
                                        <option data-countrycode="GT" value="Guatemala">🇬🇹 Guatemala</option>
                                        <option data-countrycode="GG" value="Guernsey">🇬🇬 Guernsey</option>
                                        <option data-countrycode="GN" value="Guinea">🇬🇳 Guinea</option>
                                        <option data-countrycode="GW" value="Guinea-Bissau">🇬🇼 Guinea-Bissau</option>
                                        <option data-countrycode="GY" value="Guyana">🇬🇾 Guyana</option>
                                        <option data-countrycode="HT" value="Haiti">🇭🇹 Haiti</option>
                                        <option data-countrycode="HN" value="Honduras">🇭🇳 Honduras</option>
                                        <option data-countrycode="HK" value="Hong Kong">🇭🇰 Hong Kong</option>
                                        <option data-countrycode="HU" value="Hungary">🇭🇺 Hungary</option>
                                        <option data-countrycode="IS" value="Iceland">🇮🇸 Iceland</option>
                                        <option data-countrycode="IN" value="India">🇮🇳 India</option>
                                        <option data-countrycode="ID" value="Indonesia">🇮🇩 Indonesia</option>
                                        <option data-countrycode="IR" value="Iran">🇮🇷 Iran</option>
                                        <option data-countrycode="IQ" value="Iraq">🇮🇶 Iraq</option>
                                        <option data-countrycode="IE" value="Ireland">🇮🇪 Ireland</option>
                                        <option data-countrycode="IM" value="Isle of Man">🇮🇲 Isle of Man</option>
                                        <option data-countrycode="IL" value="Israel">🇮🇱 Israel</option>
                                        <option data-countrycode="IT" value="Italy">🇮🇹 Italy</option>
                                        <option data-countrycode="JM" value="Jamaica">🇯🇲 Jamaica</option>
                                        <option data-countrycode="JP" value="Japan">🇯🇵 Japan</option>
                                        <option data-countrycode="JE" value="Jersey">🇯🇪 Jersey</option>
                                        <option data-countrycode="JO" value="Jordan">🇯🇴 Jordan</option>
                                        <option data-countrycode="KZ" value="Kazakhstan">🇰🇿 Kazakhstan</option>
                                        <option data-countrycode="KE" value="Kenya">🇰🇪 Kenya</option>
                                        <option data-countrycode="KI" value="Kiribati">🇰🇮 Kiribati</option>
                                        <option data-countrycode="KW" value="Kuwait">🇰🇼 Kuwait</option>
                                        <option data-countrycode="KG" value="Kyrgyzstan">🇰🇬 Kyrgyzstan</option>
                                        <option data-countrycode="LA" value="Laos">🇱🇦 Laos</option>
                                        <option data-countrycode="LV" value="Latvia">🇱🇻 Latvia</option>
                                        <option data-countrycode="LB" value="Lebanon">🇱🇧 Lebanon</option>
                                        <option data-countrycode="LS" value="Lesotho">🇱🇸 Lesotho</option>
                                        <option data-countrycode="LR" value="Liberia">🇱🇷 Liberia</option>
                                        <option data-countrycode="LY" value="Libya">🇱🇾 Libya</option>
                                        <option data-countrycode="LI" value="Liechtenstein">🇱🇮 Liechtenstein</option>
                                        <option data-countrycode="LT" value="Lithuania">🇱🇹 Lithuania</option>
                                        <option data-countrycode="LU" value="Luxembourg">🇱🇺 Luxembourg</option>
                                        <option data-countrycode="MO" value="Macau">🇲🇴 Macau</option>
                                        <option data-countrycode="MG" value="Madagascar">🇲🇬 Madagascar</option>
                                        <option data-countrycode="MW" value="Malawi">🇲🇼 Malawi</option>
                                        <option data-countrycode="MY" value="Malaysia">🇲🇾 Malaysia</option>
                                        <option data-countrycode="MV" value="Maldives">🇲🇻 Maldives</option>
                                        <option data-countrycode="ML" value="Mali">🇲🇱 Mali</option>
                                        <option data-countrycode="MT" value="Malta">🇲🇹 Malta</option>
                                        <option data-countrycode="MH" value="Marshall Islands">🇲🇭 Marshall Islands
                                        </option>
                                        <option data-countrycode="MQ" value="Martinique">🇲🇶 Martinique</option>
                                        <option data-countrycode="MR" value="Mauritania">🇲🇷 Mauritania</option>
                                        <option data-countrycode="MU" value="Mauritius">🇲🇺 Mauritius</option>
                                        <option data-countrycode="YT" value="Mayotte">🇾🇹 Mayotte</option>
                                        <option data-countrycode="MX" value="Mexico">🇲🇽 Mexico</option>
                                        <option data-countrycode="FM" value="Micronesia">🇫🇲 Micronesia</option>
                                        <option data-countrycode="MD" value="Moldova">🇲🇩 Moldova</option>
                                        <option data-countrycode="MC" value="Monaco">🇲🇨 Monaco</option>
                                        <option data-countrycode="MN" value="Mongolia">🇲🇳 Mongolia</option>
                                        <option data-countrycode="ME" value="Montenegro">🇲🇪 Montenegro</option>
                                        <option data-countrycode="MS" value="Montserrat">🇲🇸 Montserrat</option>
                                        <option data-countrycode="MA" value="Morocco">🇲🇦 Morocco</option>
                                        <option data-countrycode="MZ" value="Mozambique">🇲🇿 Mozambique</option>
                                        <option data-countrycode="MM" value="Myanmar (Burma)">🇲🇲 Myanmar (Burma)
                                        </option>
                                        <option data-countrycode="NA" value="Namibia">🇳🇦 Namibia</option>
                                        <option data-countrycode="NR" value="Nauru">🇳🇷 Nauru</option>
                                        <option data-countrycode="NP" value="Nepal">🇳🇵 Nepal</option>
                                        <option data-countrycode="NL" value="Netherlands">🇳🇱 Netherlands</option>
                                        <option data-countrycode="NC" value="New Caledonia">🇳🇨 New Caledonia</option>
                                        <option data-countrycode="NZ" value="New Zealand">🇳🇿 New Zealand</option>
                                        <option data-countrycode="NI" value="Nicaragua">🇳🇮 Nicaragua</option>
                                        <option data-countrycode="NE" value="Niger">🇳🇪 Niger</option>
                                        <option data-countrycode="NG" value="Nigeria" >🇳🇬 Nigeria</option>
                                        <option data-countrycode="NU" value="Niue">🇳🇺 Niue</option>
                                        <option data-countrycode="NF" value="Norfolk Island">🇳🇫 Norfolk Island
                                        </option>
                                        <option data-countrycode="KP" value="North Korea">🇰🇵 North Korea</option>
                                        <option data-countrycode="MK" value="North Macedonia">🇲🇰 North Macedonia
                                        </option>
                                        <option data-countrycode="MP" value="Northern Mariana Islands">🇲🇵 Northern
                                            Mariana Islands</option>
                                        <option data-countrycode="NO" value="Norway">🇳🇴 Norway</option>
                                        <option data-countrycode="OM" value="Oman">🇴🇲 Oman</option>
                                        <option data-countrycode="PK" value="Pakistan">🇵🇰 Pakistan</option>
                                        <option data-countrycode="PW" value="Palau">🇵🇼 Palau</option>
                                        <option data-countrycode="PS" value="Palestine">🇵🇸 Palestine</option>
                                        <option data-countrycode="PA" value="Panama">🇵🇦 Panama</option>
                                        <option data-countrycode="PG" value="Papua New Guinea">🇵🇬 Papua New Guinea
                                        </option>
                                        <option data-countrycode="PY" value="Paraguay">🇵🇾 Paraguay</option>
                                        <option data-countrycode="PE" value="Peru">🇵🇪 Peru</option>
                                        <option data-countrycode="PH" value="Philippines">🇵🇭 Philippines</option>
                                        <option data-countrycode="PL" value="Poland">🇵🇱 Poland</option>
                                        <option data-countrycode="PT" value="Portugal">🇵🇹 Portugal</option>
                                        <option data-countrycode="PR" value="Puerto Rico">🇵🇷 Puerto Rico</option>
                                        <option data-countrycode="QA" value="Qatar">🇶🇦 Qatar</option>
                                        <option data-countrycode="RE" value="Réunion">🇷🇪 Réunion</option>
                                        <option data-countrycode="RO" value="Romania">🇷🇴 Romania</option>
                                        <option data-countrycode="RU" value="Russia">🇷🇺 Russia</option>
                                        <option data-countrycode="RW" value="Rwanda">🇷🇼 Rwanda</option>
                                        <option data-countrycode="WS" value="Samoa">🇼🇸 Samoa</option>
                                        <option data-countrycode="SM" value="San Marino">🇸🇲 San Marino</option>
                                        <option data-countrycode="SA" value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
                                        <option data-countrycode="SN" value="Senegal">🇸🇳 Senegal</option>
                                        <option data-countrycode="RS" value="Serbia">🇷🇸 Serbia</option>
                                        <option data-countrycode="SC" value="Seychelles">🇸🇨 Seychelles</option>
                                        <option data-countrycode="SL" value="Sierra Leone">🇸🇱 Sierra Leone</option>
                                        <option data-countrycode="SG" value="Singapore">🇸🇬 Singapore</option>
                                        <option data-countrycode="SX" value="Sint Maarten">🇸🇽 Sint Maarten</option>
                                        <option data-countrycode="SK" value="Slovakia">🇸🇰 Slovakia</option>
                                        <option data-countrycode="SI" value="Slovenia">🇸🇮 Slovenia</option>
                                        <option data-countrycode="SB" value="Solomon Islands">🇸🇧 Solomon Islands
                                        </option>
                                        <option data-countrycode="SO" value="Somalia">🇸🇴 Somalia</option>
                                        <option data-countrycode="ZA" value="South Africa">🇿🇦 South Africa</option>
                                        <option data-countrycode="KR" value="South Korea">🇰🇷 South Korea</option>
                                        <option data-countrycode="SS" value="South Sudan">🇸🇸 South Sudan</option>
                                        <option data-countrycode="ES" value="Spain">🇪🇸 Spain</option>
                                        <option data-countrycode="LK" value="Sri Lanka">🇱🇰 Sri Lanka</option>
                                        <option data-countrycode="SD" value="Sudan">🇸🇩 Sudan</option>
                                        <option data-countrycode="SR" value="Suriname">🇸🇷 Suriname</option>
                                        <option data-countrycode="SE" value="Sweden">🇸🇪 Sweden</option>
                                        <option data-countrycode="CH" value="Switzerland">🇨🇭 Switzerland</option>
                                        <option data-countrycode="SY" value="Syria">🇸🇾 Syria</option>
                                        <option data-countrycode="TW" value="Taiwan">🇹🇼 Taiwan</option>
                                        <option data-countrycode="TJ" value="Tajikistan">🇹🇯 Tajikistan</option>
                                        <option data-countrycode="TZ" value="Tanzania">🇹🇿 Tanzania</option>
                                        <option data-countrycode="TH" value="Thailand">🇹🇭 Thailand</option>
                                        <option data-countrycode="TL" value="Timor-Leste">🇹🇱 Timor-Leste</option>
                                        <option data-countrycode="TG" value="Togo">🇹🇬 Togo</option>
                                        <option data-countrycode="TK" value="Tokelau">🇹🇰 Tokelau</option>
                                        <option data-countrycode="TO" value="Tonga">🇹🇴 Tonga</option>
                                        <option data-countrycode="TT" value="Trinidad and Tobago">🇹🇹 Trinidad and
                                            Tobago</option>
                                        <option data-countrycode="TN" value="Tunisia">🇹🇳 Tunisia</option>
                                        <option data-countrycode="TR" value="Turkey">🇹🇷 Turkey</option>
                                        <option data-countrycode="TM" value="Turkmenistan">🇹🇲 Turkmenistan</option>
                                        <option data-countrycode="TC" value="Turks and Caicos Islands">🇹🇨 Turks and
                                            Caicos Islands</option>
                                        <option data-countrycode="TV" value="Tuvalu">🇹🇻 Tuvalu</option>
                                        <option data-countrycode="UG" value="Uganda">🇺🇬 Uganda</option>
                                        <option data-countrycode="UA" value="Ukraine">🇺🇦 Ukraine</option>
                                        <option data-countrycode="AE" value="United Arab Emirates">🇦🇪 United Arab
                                            Emirates</option>
                                        <option data-countrycode="GB" value="United Kingdom">🇬🇧 United Kingdom
                                        </option>
                                        <option data-countrycode="US" value="United States">🇺🇸 United States</option>
                                        <option data-countrycode="UY" value="Uruguay">🇺🇾 Uruguay</option>
                                        <option data-countrycode="UZ" value="Uzbekistan">🇺🇿 Uzbekistan</option>
                                        <option data-countrycode="VU" value="Vanuatu">🇻🇺 Vanuatu</option>
                                        <option data-countrycode="VA" value="Vatican City">🇻🇦 Vatican City</option>
                                        <option data-countrycode="VE" value="Venezuela">🇻🇪 Venezuela</option>
                                        <option data-countrycode="VN" value="Vietnam">🇻🇳 Vietnam</option>
                                        <option data-countrycode="WF" value="Wallis and Futuna">🇼🇫 Wallis and Futuna
                                        </option>
                                        <option data-countrycode="YE" value="Yemen">🇾🇪 Yemen</option>
                                        <option data-countrycode="ZM" value="Zambia">🇿🇲 Zambia</option>
                                        <option data-countrycode="ZW" value="Zimbabwe">🇿🇼 Zimbabwe</option>
                                    
              </select>
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                value={profile.state}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  !isEditing && "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={profile.location}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  !isEditing && "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mr-2"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mr-2"
              >
                Edit
              </button>
            )}

            {/* Ban Modal */}
            <div>
              <button
                onClick={() => setBanModalOpen(true)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
              >
                Ban account
              </button>

              {isBanModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                    <h2 className="text-xl font-bold text-red-600 mb-2">
                      Warning: Account Ban
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Are you sure you want to permanently ban this account?
                    </p>

                    <ul className="list-disc list-inside text-gray-600 mb-4">
                      <li>
                        All associated data, including user info and activity,
                        will be permanently removed.
                      </li>
                      <li>
                        The user will lose access to all services and features.
                      </li>
                      <li>
                        Any subscriptions or services linked to this account
                        will be canceled.
                      </li>
                    </ul>

                    <p className="text-sm text-gray-500 mb-6">
                      Please confirm that you have reviewed this action and
                      understand its consequences.
                    </p>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleBan}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md"
                      >
                        Ban account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
