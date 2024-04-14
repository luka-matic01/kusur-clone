import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

const Tenants = () => {
  const { slug } = useLocalSearchParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://192.168.100.168:3000/api/users/${slug}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [slug]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!userData) {
    return <Text>Error: User data not found</Text>;
  }

  return (
    <Text>
      User ID: {userData.id} {'\n'}
      Phone Number: {userData.phoneNumber} {'\n'}
      First Name: {userData.firstName} {'\n'}
      Last Name: {userData.lastName} {'\n'}
      Wallet Point Balance: {userData.wallet.pointBalance} {'\n'}
      Tenants:
      {userData.relusertenant.map((relUserTenant) => (
        <Text key={relUserTenant.id}>
          - Tenant ID: {relUserTenant.tenant.id} {'\n'}
            Description: {relUserTenant.tenant.description} {'\n'}
            Vouchers:
            {relUserTenant.tenant.vouchers.map((voucher) => (
              <Text key={voucher.id}>
                -- Voucher ID: {voucher.id} {'\n'}
                  Name: {voucher.name} {'\n'}
                  Description: {voucher.description} {'\n'}
              </Text>
            ))}
            Coupons:
            {relUserTenant.tenant.coupons.map((coupon) => (
              <Text key={coupon.id}>
                -- Coupon ID: {coupon.id} {'\n'}
                  Name: {coupon.name} {'\n'}
                  Description: {coupon.description} {'\n'}
              </Text>
            ))}
        </Text>
      ))}
    </Text>
  );
};

export default Tenants;
