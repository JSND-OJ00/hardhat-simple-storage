// I'm a comment!
// SPDX-License-Identifier: MIT

pragma solidity 0.8.8;

// pragma solidity ^0.8.0;
// pragma solidity >=0.8.0 <0.9.0;

contract SimpleStorage {
    uint256 favoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    // uint256[] public anArray;
    // People 타입을 요소로 갖는 people이라는 이름의 배열
    People[] public people;

    // string을 key로, uint256을 value로 짝지어 줍니다.
    mapping(string => uint256) public nameToFavoriteNumber;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber; // 다르다는 것을 명시하기 위해 _를 붙여줍니다.
    }

    //  view 함수는 단순히 조회만 가능합니다.
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name)); // people 배열에 새로운 People을 추가합니다.
        nameToFavoriteNumber[_name] = _favoriteNumber; // key와 value 짝을 만듭니다.
    }
}
